package com.example.web_II.services;

import com.example.web_II.domain.categoria.Categoria;
import com.example.web_II.domain.cliente.Cliente;
import com.example.web_II.domain.cliente.EnviarClienteDTO;
import com.example.web_II.domain.funcionarios.Funcionario;
import com.example.web_II.domain.geral.RespostaPadraoDTO;
import com.example.web_II.domain.historico.HistoricoAlteracaoDTO;
import com.example.web_II.domain.historico.SolicitacaoComHistoricoDTO;
import com.example.web_II.domain.receita.Receita;
import com.example.web_II.domain.solicitacoes.*;
import com.example.web_II.domain.historico.HistoricoAlteracao;
import com.example.web_II.exceptions.*;
import com.example.web_II.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.swing.plaf.basic.BasicTreeUI;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class SolicitacoesService {

    @Autowired
    private SolicitacaoRepository solicitacaoRepository;

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private HistoricoAlteracaoRepository historicoAlteracaoRepository;

    @Autowired
    private FuncionarioService funcionarioService;

    @Autowired
    private ReceitaRepository receitaRepository;

    @Autowired
    private CategoriaRepository categoriaRepository;

    @Autowired FuncionarioRepository funcionarioRepository;


    public ResponseEntity<RespostaPadraoDTO> criarSolicitacao(AbrirSolicitacaoDTO data) {
        Optional<Categoria> categoriaOpt = categoriaRepository.findByDescricao(data.categoria());
        Optional<Cliente> clienteOpt = clienteRepository.findById(data.idCliente());

        if (categoriaOpt.isEmpty() || !categoriaOpt.get().isAtiva()) {
            return ResponseEntity.badRequest().body(new RespostaPadraoDTO(
                    HttpStatus.BAD_REQUEST.toString(), "Categoria Inválida ou Inexistente"
            ));
        } else if (clienteOpt.isEmpty()){
            return ResponseEntity.badRequest().body(new RespostaPadraoDTO(
                    HttpStatus.BAD_REQUEST.toString(), "Cliente Inválido ou Inexistente"
            ));
        }

        Solicitacao novaSolicitacao = new Solicitacao(
                data.idCliente(),
                data.descEquip(),
                categoriaOpt.get().getId(),
                data.descDefeito(),
                "1"
        );

        Solicitacao solicitacaoSalva = this.solicitacaoRepository.save(novaSolicitacao);

        HistoricoAlteracao historico = new HistoricoAlteracao(
                solicitacaoSalva.getId(),
                "Solicitação criada",
                null,
                "1"
        );

        this.historicoAlteracaoRepository.save(historico);

        return ResponseEntity.status(HttpStatus.CREATED).body(new RespostaPadraoDTO
                (HttpStatus.CREATED.toString(), "Solicitacao criada!")
        );
    }

    public ResponseEntity<String> buscarSolicitacao(String id){
        if (!solicitacaoRepository.existsById(id)){
            return ResponseEntity.ok("Esta OS não existe!!");
        }
        Optional<Solicitacao> solicitacaoBuscada = solicitacaoRepository.findById(id);
        return ResponseEntity.ok(solicitacaoBuscada.get().getId() + "\n" +
                solicitacaoBuscada.get().getFkCliente() + "\n" +
                solicitacaoBuscada.get().getDescricao_equipamento() + "\n" +
                solicitacaoBuscada.get().getFkCategoriaEquipamento() + "\n" + // Nome atualizado
                solicitacaoBuscada.get().getDescricao_defeito() + "\n" +
                solicitacaoBuscada.get().getFk_estado() + "\n" +
                solicitacaoBuscada.get().getData_hora() + "\n" +
                solicitacaoBuscada.get().getFk_funcionario());
    }

    public ResponseEntity<List<SolicitacaoClienteDTO>> buscarSolicitacaoCliente(String cliente) {
        if (!clienteRepository.existsById(cliente)) {
            throw new ClienteNaoEncontradoException();
        }

        List<Solicitacao> solicitacoes = solicitacaoRepository.findByFkCliente(cliente);
        List<SolicitacaoClienteDTO> response = new ArrayList<>();

        for (Solicitacao solicitacao : solicitacoes) {
            String descricaoCategoria = categoriaRepository.findById(solicitacao.getFkCategoriaEquipamento())
                    .map(Categoria::getDescricao)
                    .orElse("Categoria desconhecida");

            response.add(SolicitacaoClienteDTO.fromEntity(solicitacao, descricaoCategoria));
        }

        return ResponseEntity.ok(response);
    }

    public ResponseEntity<RespostaPadraoDTO> orcamentoService(OrcamentoDTO data) {

        if (!solicitacaoRepository.existsById(data.id())) {
            throw new SolicitacaoInexistente();
        }

        Optional<Solicitacao> solicitacaoOpt = solicitacaoRepository.findById(data.id());
        if (solicitacaoOpt.isEmpty()) {
            throw new FalhaPegarSolicitacao();
        }

        AtribuirFuncionarioDTO atribuirFuncioario = new AtribuirFuncionarioDTO(data.id(),data.ifFuncionario());

        atribuirFuncionario(atribuirFuncioario);
        Solicitacao solicitacao = solicitacaoOpt.get();

        String estadoAnterior = solicitacao.getFk_estado();
        if (!Objects.equals(estadoAnterior, "1")){
            throw new SolicitacaoAtualizarInvalido();
        }

        solicitacao.setFk_estado("2");
        solicitacao.setOrcamento(data.valor());

        solicitacaoRepository.save(solicitacao);

        HistoricoAlteracao historico = new HistoricoAlteracao(
                data.id(),
                "Orçamento de R$ " + data.valor() + " registrado por" + solicitacao.getFuncionario().getUsuario().getNome(),
                estadoAnterior,
                "2"
        );
        historicoAlteracaoRepository.save(historico);

        return ResponseEntity.ok(new RespostaPadraoDTO(
                HttpStatus.OK.toString(), "Orçamento realizado com sucesso"
        ));
    }

    public ResponseEntity<RespostaPadraoDTO> aprovarOrcamento(AprovarRejeitarDTO data) {
        String id = data.id();

        if (!solicitacaoRepository.existsById(id)) {
            throw new SolicitacaoInexistente();
        }

        Optional<Solicitacao> solicitacaoOpt = solicitacaoRepository.findById(id);
        if (solicitacaoOpt.isEmpty()) {
            throw new FalhaPegarSolicitacao();
        }

        Solicitacao solicitacao = solicitacaoOpt.get();
        String estadoAnterior = solicitacao.getFk_estado();
        if (!Objects.equals(estadoAnterior, "2")){
            throw new SolicitacaoAtualizarInvalido();
        }

        solicitacao.setFk_estado("3");
        solicitacaoRepository.save(solicitacao);

        HistoricoAlteracao historico = new HistoricoAlteracao(
                id,
                "Orçamento aprovado",
                estadoAnterior,
                "3"
        );
        historicoAlteracaoRepository.save(historico);

        return ResponseEntity.ok(new RespostaPadraoDTO(
                HttpStatus.OK.toString(),"Orçamento aprovado com sucesso"
        ));
    }

    public ResponseEntity<RespostaPadraoDTO> rejeitarOrcamento(AprovarRejeitarDTO data) {
        String id = data.id();

        if (!solicitacaoRepository.existsById(id)) {
            throw new SolicitacaoInexistente();
        }

        Optional<Solicitacao> solicitacaoOpt = solicitacaoRepository.findById(id);
        if (solicitacaoOpt.isEmpty()) {
        throw new FalhaPegarSolicitacao();
        }

        Solicitacao solicitacao = solicitacaoOpt.get();
        String estadoAnterior = solicitacao.getFk_estado();
        if (!Objects.equals(estadoAnterior, "2")){
            throw new SolicitacaoAtualizarInvalido();
        }

        solicitacao.setFk_estado("4"); // 4 = REJEITADA
        solicitacaoRepository.save(solicitacao);

        String motivo = data.motivo() != null ? data.motivo() : "Motivo não informado";
        HistoricoAlteracao historico = new HistoricoAlteracao(
                id,
                "Orçamento rejeitado. Motivo: " + motivo,
                estadoAnterior,
                "4"
        );
        historicoAlteracaoRepository.save(historico);

        return ResponseEntity.ok(new RespostaPadraoDTO(
                HttpStatus.OK.toString(),"Orçamento rejeitado com sucesso"
        ));
    }

    public ResponseEntity<RespostaPadraoDTO> atribuirFuncionario(AtribuirFuncionarioDTO data) {
        if (!solicitacaoRepository.existsById(data.idSolicitacao())) {
            throw new SolicitacaoInexistente();
        }

        Optional<Solicitacao> solicitacaoOpt = solicitacaoRepository.findById(data.idSolicitacao());
        if (solicitacaoOpt.isEmpty()) {
            throw new FalhaPegarSolicitacao();
        }

        Optional<Funcionario> funcionarioOpt = funcionarioService.findById(data.idFuncionario());
        if (funcionarioOpt.isEmpty()) {
            throw new FuncionarioNaoEncontradoException();
        }

        Solicitacao solicitacao = solicitacaoOpt.get();
        String estadoAnterior = solicitacao.getFk_estado();
        if (!Objects.equals(estadoAnterior, "1" )&& (!Objects.equals(estadoAnterior,"3"))){
            throw new SolicitacaoAtualizarInvalido();
        }

        solicitacao.setFuncionario(funcionarioOpt.get());
        solicitacaoRepository.save(solicitacao);

        HistoricoAlteracao historico = new HistoricoAlteracao(
                data.idSolicitacao(),
                "Solicitação capturada pelo funcionário " + funcionarioOpt.get().getUsuario().getNome(),
                estadoAnterior,
                solicitacao.getFk_estado()
        );
        historicoAlteracaoRepository.save(historico);

        return ResponseEntity.ok(new RespostaPadraoDTO(
                HttpStatus.OK.toString(),"Solicitação capturada com sucesso pelo funcionário " +
                                                    funcionarioOpt.get().getUsuario().getNome()
        ));
    }

    public ResponseEntity<RespostaPadraoDTO> redirecionarSolicitacao(RedirecionarSolicitacaoDTO data) {
        if (!solicitacaoRepository.existsById(data.idSolicitacao())) {
            throw new SolicitacaoInexistente();
        }

        Optional<Solicitacao> solicitacaoOpt = solicitacaoRepository.findById(data.idSolicitacao());
        if (solicitacaoOpt.isEmpty()) {
            throw new FalhaPegarSolicitacao();
        }

        Solicitacao solicitacao = solicitacaoOpt.get();

        if (solicitacao.getFuncionario() == null || !data.idFuncionarioOrigem().equals(solicitacao.getFuncionario().getId())) {
            return ResponseEntity.badRequest().body(new RespostaPadraoDTO(
                    HttpStatus.BAD_REQUEST.toString(),"A solicitação não está atribuída ao funcionário de origem informado"
            ));
        }

        Optional<Funcionario> funcionarioDestinoOpt = funcionarioService.findById(data.idFuncionarioDestino());
        if (funcionarioDestinoOpt.isEmpty()) {
            throw new FuncionarioNaoEncontradoException();
        }

        String estadoAnterior = solicitacao.getFk_estado();
        if (!Objects.equals(estadoAnterior, "3") && !Objects.equals(estadoAnterior, "5") || solicitacao.getFuncionario() == funcionarioDestinoOpt.get()){
            throw new SolicitacaoAtualizarInvalido();
        }

        String nomeFuncionarioOrigem = solicitacao.getFuncionario().getUsuario().getNome();

        solicitacao.setFuncionario(funcionarioDestinoOpt.get());
        solicitacao.setFk_estado("5");
        solicitacaoRepository.save(solicitacao);

        HistoricoAlteracao historico = new HistoricoAlteracao(
                data.idSolicitacao(),
                "Solicitação redirecionada de " + nomeFuncionarioOrigem +
                        " para " + funcionarioDestinoOpt.get().getUsuario().getNome(),
                estadoAnterior,
                "5"
        );
        historicoAlteracaoRepository.save(historico);

        return ResponseEntity.ok(new RespostaPadraoDTO(
                HttpStatus.OK.toString(),"Solicitação redirecionada com sucesso para o funcionário " +
                                                    funcionarioDestinoOpt.get().getUsuario().getNome()
        ));
    }

    public ResponseEntity<RespostaPadraoDTO> marcarComoArrumada(MudarEstadoArrumadaDTO data) {
        return mudarArrumada(data, "6", "ARRUMADA");
    }

    public ResponseEntity<RespostaPadraoDTO> marcarComoPaga(MudarEstadoDTO data) {
        // criar receita e salvar ela
        Optional<Solicitacao> solicitacaoTempOpt = solicitacaoRepository.findById(data.idSolicitacao());
        Solicitacao solicitacaotemp = solicitacaoTempOpt.get();
        Receita receitaTemp = new Receita(solicitacaotemp.getOrcamento(),solicitacaotemp.getData_hora(),solicitacaotemp.getId());
        receitaRepository.save(receitaTemp);

        return mudarEstado(data, "7", "PAGA");

    }

    public ResponseEntity<RespostaPadraoDTO> marcarComoFinalizada(MudarEstadoDTO data) {
        return mudarEstado(data, "8", "FINALIZADA");
    }

    public ResponseEntity<RespostaPadraoDTO> marcarComoEntregue(MudarEstadoDTO data) {
        return mudarEstado(data, "9", "ENTREGADA");
    }

    private ResponseEntity<RespostaPadraoDTO> mudarEstado(MudarEstadoDTO data, String novoEstado, String nomeEstado) {
        if (!solicitacaoRepository.existsById(data.idSolicitacao())) {
            throw new SolicitacaoInexistente();
        }

        Optional<Solicitacao> solicitacaoOpt = solicitacaoRepository.findById(data.idSolicitacao());
        if (solicitacaoOpt.isEmpty()) {
            throw new FalhaPegarSolicitacao();
        }

        Solicitacao solicitacao = solicitacaoOpt.get();
        String estadoAnterior = solicitacao.getFk_estado();
        int estadoAnteriorInt = Integer.parseInt(estadoAnterior);
        int novoEstadoInt = Integer.parseInt(novoEstado);
        if (estadoAnteriorInt != novoEstadoInt-1){
            throw new SolicitacaoAtualizarInvalido();
        }

        solicitacao.setFk_estado(novoEstado);
        solicitacaoRepository.save(solicitacao);

        HistoricoAlteracao historico = new HistoricoAlteracao(
                data.idSolicitacao(),
                "Solicitação atualizada para " + nomeEstado,
                estadoAnterior,
                novoEstado
        );
        historicoAlteracaoRepository.save(historico);

        return ResponseEntity.ok(new RespostaPadraoDTO(
                HttpStatus.OK.toString(),"Solicitação atualizada para " + nomeEstado + " com sucesso"
        ));
    }


    private ResponseEntity<RespostaPadraoDTO> mudarArrumada(MudarEstadoArrumadaDTO data, String novoEstado, String nomeEstado) {
        if (!solicitacaoRepository.existsById(data.idSolicitacao())) {
            throw new SolicitacaoInexistente();
        }

        Optional<Solicitacao> solicitacaoOpt = solicitacaoRepository.findById(data.idSolicitacao());
        if (solicitacaoOpt.isEmpty()) {
            throw new FalhaPegarSolicitacao();
        }

        Solicitacao solicitacao = solicitacaoOpt.get();
        String estadoAnterior = solicitacao.getFk_estado();
        if (!Objects.equals(estadoAnterior, "3") && !Objects.equals(estadoAnterior, "5")){
            throw new SolicitacaoAtualizarInvalido();
        }

        solicitacao.setOrientacoes_cliente(data.orientacoes_cliente());
        solicitacao.setDescricao_manutencao(data.descricao_manutencao());
        solicitacao.setFk_estado(novoEstado);
        solicitacaoRepository.save(solicitacao);

        HistoricoAlteracao historico = new HistoricoAlteracao(
                data.idSolicitacao(),
                "Solicitação atualizada para " + nomeEstado,
                estadoAnterior,
                novoEstado
        );
        historicoAlteracaoRepository.save(historico);

        return ResponseEntity.ok(new RespostaPadraoDTO(
                HttpStatus.OK.toString(),"Solicitação atualizada para " + nomeEstado + " com sucesso"
        ));
    }



    public ResponseEntity<SolicitacaoComHistoricoDTO> getSolicitacaoComHistorico(String id) {
        Optional<Solicitacao> solicitacaoOpt = solicitacaoRepository.findByIdWithHistorico(id);

        if (solicitacaoOpt.isEmpty()) {
            throw new SolicitacaoInexistente();
        }

        Solicitacao solicitacao = solicitacaoOpt.get();

        String descricaoCategoria = categoriaRepository.findById(solicitacao.getFkCategoriaEquipamento())
                .map(Categoria::getDescricao)
                .orElse("Categoria desconhecida");

        String funcionarioNome = "Não atribuído";
        if (solicitacao.getFuncionario() != null) {
            funcionarioNome = solicitacao.getFuncionario().getUsuario().getNome();
        }

        Cliente clienteTemp = clienteRepository.findById(solicitacao.getFkCliente()).get();
        EnviarClienteDTO DTOtemp = new EnviarClienteDTO(
                clienteTemp.getUsuario().getUsername(),
                clienteTemp.getCpf(),
                clienteTemp.getUsuario().getEmail(),
                clienteTemp.getTelefone(),
                clienteTemp.getEndereco().getCep(),
                clienteTemp.getEndereco().getLogradouro(),
                clienteTemp.getEndereco().getComplemento(),
                clienteTemp.getEndereco().getLocalidade(),
                clienteTemp.getEndereco().getUf()
        );

        List<HistoricoAlteracaoDTO> historicoDTOs = solicitacao.getHistoricoAlteracoes().stream()
                .map(historico -> {
                    String funcionarioRedirecionado = null;
                    // Verifica se é um histórico de redirecionamento (estado novo = 5)
                    if ("5".equals(historico.getEstadoNovo())) {
                        String descricao = historico.getDescricao();
                        // Extrai o nome do funcionário destino da descrição
                        if (descricao.startsWith("Solicitação redirecionada de ")){
                            String[] partes = descricao.split(" para ");
                            if (partes.length > 1) {
                                funcionarioRedirecionado = partes[1];
                            }
                        } else if (descricao.startsWith("Orçamento aprovado de")){
                            String[] partes = descricao.split("por");
                            if (partes.length > 1){
                                funcionarioRedirecionado = partes[1];
                            }
                        }
                    }
                    return new HistoricoAlteracaoDTO(
                            historico.getDescricao(),
                            historico.getEstadoAnterior(),
                            historico.getEstadoNovo(),
                            historico.getDataHora(),
                            funcionarioRedirecionado
                    );
                })
                .collect(Collectors.toList());

        SolicitacaoComHistoricoDTO response = new SolicitacaoComHistoricoDTO(
                solicitacao.getId(),
                solicitacao.getNumeroOs(),
                solicitacao.getDescricao_equipamento(),
                descricaoCategoria,
                solicitacao.getDescricao_defeito(),
                solicitacao.getOrientacoes_cliente(),
                solicitacao.getDescricao_manutencao(),
                solicitacao.getFk_estado(),
                funcionarioNome,
                DTOtemp,
                solicitacao.getOrcamento(),
                solicitacao.getData_hora(),
                historicoDTOs
        );

        return ResponseEntity.ok(response);
    }

    public ResponseEntity<List<SolicitacaoFuncionarioDTO>> getSolicitacoesAbertasOuAlocadasAoFuncionario(String funcionarioId) {
        Funcionario funcionario = funcionarioRepository.findById(funcionarioId)
                .orElseThrow(FuncionarioNaoEncontradoException::new);

        List<Solicitacao> solicitacoes = solicitacaoRepository.findSolicitacoesAbertasOuAlocadasAoFuncionario(funcionarioId);
        List<SolicitacaoFuncionarioDTO> dtos = new ArrayList<>();


        for (Solicitacao sol : solicitacoes){
            Cliente clienteTemp = clienteRepository.findById(sol.getFkCliente()).get();
            dtos.add(new SolicitacaoFuncionarioDTO(sol,clienteTemp));
        }

        return ResponseEntity.ok(dtos);
    }
}
