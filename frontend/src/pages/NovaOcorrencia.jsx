const NovaOcorrencia = () => {
  return (
    <div>
      <h1>Nova Ocorrência</h1>

      <form>
        <label>Título</label>
        <input type="text" />

        <label>Descrição</label>
        <textarea></textarea>

        <button type="submit">
          Submeter ocorrência
        </button>
      </form>
    </div>
  )
}

export default NovaOcorrencia