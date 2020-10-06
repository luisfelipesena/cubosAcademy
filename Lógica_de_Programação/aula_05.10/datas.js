// Exercícios Resolvidos
//Questão 1
const copaDoMundo = new Date(2002, 5, 30, 8);
console.log(copaDoMundo);

//Questão 2
const copaDoMundoInicio = new Date(2002, 5, 30, 8);
const primeiroGol = {
  gols: new Date(+copaDoMundoInicio + (45 + 15 + 22) * 60 * 1000),
};

const segundoGol = {
  gols: new Date(+primeiroGol.gols + 1000 * 60 * 12),
};

console.log(primeiroGol.gols);
console.log(segundoGol.gols);

//Exercícios de Classe
//Questão 1
const data = new Date();
console.log(data.toLocaleString());

//Questão 2
const natalData = new Date(2019, 11, 25, 21, 30);
console.log(natalData.toLocaleString());

//Exercícios Casa
//Questão 3
const pessoas = [
  {
    name: "Kirkland",
    company: "ECLIPSENT",
    registered: "Mon Dec 07 2015 07:01:50 GMT+0000",
  },
  {
    name: "Elise",
    company: "ILLUMITY",
    registered: "Fri Mar 02 2018 11:37:56 GMT+0000",
  },
  {
    name: "Waters",
    company: "PERMADYNE",
    registered: "Tue Apr 09 2019 08:31:31 GMT+0000",
  },
  {
    name: "Tanner",
    company: "MIRACLIS",
    registered: "Wed Nov 14 2018 16:11:14 GMT+0000",
  },
  {
    name: "Knapp",
    company: "ENDIPIN",
    registered: "Sun Jul 30 2017 00:05:33 GMT+0000",
  },
  {
    name: "Beverly",
    company: "MYOPIUM",
    registered: "Thu Sep 07 2017 16:13:51 GMT+0000",
  },
  {
    name: "Mcfarland",
    company: "JASPER",
    registered: "Mon Sep 14 2020 10:02:15 GMT+0000",
  },
  {
    name: "Vaughan",
    company: "ULTRIMAX",
    registered: "Tue May 06 2014 00:08:34 GMT+0000",
  },
  {
    name: "Parker",
    company: "LUXURIA",
    registered: "Tue Jun 16 2020 14:13:29 GMT+0000",
  },
];

const pessoasTimestamp = pessoas.map((pessoa) => ({
  ...pessoa,
  registered: new Date(pessoa.registered),
}));

pessoasTimestamp.sort((a, b) => +a.registered - +b.registered);

console.log(pessoasTimestamp);

//Questão 4
const comercio = (cliente) => {
  const horarioLoja = {
    abertura: new Date(
      cliente.getFullYear(),
      cliente.getMonth(),
      cliente.getDate(),
      8
    ),
    fechamento: new Date(
      cliente.getFullYear(),
      cliente.getMonth(),
      cliente.getDate(),
      18
    ),
  };
  if (+cliente < +horarioLoja.abertura || +cliente > +horarioLoja.fechamento) {
    return false;
  } else {
    return true;
  }
};

const dataCliente = new Date(2020, 11, 1, 18);
console.log(comercio(dataCliente));

//Questão 5
const comercio = (cliente) => {
  const diasLoja = {
    abertura: 1,
    fechamento: 5,
  };

  const horarioLoja = {
    abertura: new Date(
      cliente.getFullYear(),
      cliente.getMonth(),
      cliente.getDate(),
      8
    ),
    fechamento: new Date(
      cliente.getFullYear(),
      cliente.getMonth(),
      cliente.getDate(),
      18
    ),
  };
  if (
    +cliente < +horarioLoja.abertura ||
    +cliente > +horarioLoja.fechamento ||
    cliente.getDay() > diasLoja.fechamento ||
    cliente.getDay() < diasLoja.abertura
  ) {
    return false;
  } else {
    return true;
  }
};

const dataCliente = new Date(2020, 9, 5, 18);
console.log(comercio(dataCliente));

//Questão 6
const comercio = (cliente) => {
  const horarioLojaNormal = {
    abertura: new Date(
      cliente.getFullYear(),
      cliente.getMonth(),
      cliente.getDate(),
      8
    ),
    fechamento: new Date(
      cliente.getFullYear(),
      cliente.getMonth(),
      cliente.getDate(),
      18
    ),
  };

  const horarioLojaSabado = {
    abertura: new Date(
      cliente.getFullYear(),
      cliente.getMonth(),
      cliente.getDate(),
      8
    ),
    fechamento: new Date(
      cliente.getFullYear(),
      cliente.getMonth(),
      cliente.getDate(),
      12
    ),
  };
  if (cliente.getDay() === 6) {
    if (
      +cliente < +horarioLojaSabado.abertura ||
      +cliente > +horarioLojaSabado.fechamento
    ) {
      return false;
    }
    return true;
  } else if (cliente.getDay() === 0) {
    return false;
  } else {
    if (
      +cliente < +horarioLojaNormal.abertura ||
      +cliente > +horarioLojaNormal.fechamento
    ) {
      return false;
    }
    return true;
  }
};

const dataCliente = new Date(2020, 9, 10, 13);
console.log(comercio(dataCliente));

//Questão 7
const promocao = (inicio, solicitado) => {
  if (+solicitado <= +inicio + 1000 * 60 * 60 * 24) {
    return true;
  } else {
    return false;
  }
};
const inicio = new Date(2020, 9, 4, 15);
const solicitado = new Date(2020, 9, 5, 15);
console.log(promocao(inicio, solicitado));

//Questão 8
const promocao = (inicio, solicitado) => {
  if (+solicitado <= +inicio + 1000 * 60 * 60 * 24 * 30) {
    return true;
  } else {
    return false;
  }
};
const inicio = new Date(2020, 9, 4, 15);
const solicitado = new Date(2020, 10, 3, 15);
console.log(promocao(inicio, solicitado));

//Questão 9
function formatarData(data) {
  return data.toLocaleString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

const data = new Date();
console.log(formatarData(data));

//Questão 10
function formatarData(data) {
  const formatada = data
    .toLocaleString(undefined, {
      year: "numeric",
      month: "numeric",
      day: "2-digit",
    })
    .split("-")
    .reverse()
    .join("/");
  return formatada;
}

const data = new Date();
console.log(formatarData(data));
