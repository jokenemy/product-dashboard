
import { Link } from 'react-router-dom';

export default function AdicionarProduto(){
    return(
        <div>
        <form>
        <br></br>
        <label> NOME:
        <input type="text" id="nome"></input>
        </label>
        <br></br><br></br>
        <label> TAMANHO:
        <input type="text" id="tamanho"></input>
        </label>
        <br></br><br></br>
        <label> PREÇO:
        <input type="text" id="preço"></input>
        </label>
        <br></br>
        <button type="submit"> ENVIAR</button>
        </form>
        </div>
        
    )
}