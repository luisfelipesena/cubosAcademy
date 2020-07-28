const numeros = [2, 5, 3, 0, 8,-1];
let aux = [];
let j = numeros.length; 
let x;

for (let h = 0; h < j; h++)
{
  for (x = 0; x < j - 1; x++)
  {
    /* x+1 necessita ficar primeiro que x nesse caso, logo cria-se
     um vetor auxiliar para guardar um valor e trocar pelo outro*/
    if (numeros[x] > numeros[x+1])
    {
      aux = numeros[x+1];
      numeros[x+1] = numeros[x];
      numeros[x] = aux;
      x = -1;
    }
    else
    {
      continue;
    }
  }
}
  
console.log(numeros);
