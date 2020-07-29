/* Back-end 28/07 classe

  Dataset: times.sql
  
# Questão 1 - Pelas categorias que tiveram mais honras, liste as 5 mais honradas: */

select category, count(honor)
from times 
group by category 
order by count(honor) desc 
limit 5;

/* # Questão 2  - Busque pelas categorias que tiveram entre 3 e 6 honras: */

select *
from (
	select category, count(honor) as honor
	from times 
	group by category
	) as count
where count.honor between '3' and '6'
order by count.honor desc
limit 6;

/* # Questão 3 - Com os dados da resposta anterior, busque as honras que sejam as duas mais premiadas: */

select name, year, category
from times
where category in (
	select category
	from (
		select category, count(honor) as honor
		from times 
		group by category
		) as count
	where count.honor between '3' and '6'
	order by count.honor desc
	limit 2
	)
;

/* Dataset: nobel.sql

 # Questão 4 - Para os países que mais tiveram honras (assume-se o país de nascimento), busque por aqueles que tiveram entre 10 e 50 honras: */
 
select * 
from (
	select birth_country, count(Laureate_ID ) as countries
	from nobel
	group by birth_country 
	order by count(laureate_id) desc
	) as subquerie
where subquerie.countries between '10' and '50'
;

/* # Questão 5 - existem divisões no prêmio, a coluna prize_share refere-se a a divisão, ex: 1/1 significa que o prêmio não foi dividido,
1/2 significa que duas pessoas dividiram a premiaçao, 1/3 significa 3 pessoas, e 1/4, 4 pessoas. Quais divisões são as menos comuns? */

select prize_share
from (
	select prize_share, count(prize_share) as prize
	from nobel 
	group by prize_share 
	) as sub
order by sub.prize asc
;



/* # Questão 6 - Utilizando a consulta da resposta anterior, busque por todas as premiações que entram na restrição de ser a menos comum em relação a divisão. 
Utilize subqueries para responder essa pergunta */

select full_name, category, year
from nobel
where prize_share = (
	select prize_share
	from (
		select prize_share, count(prize_share) as prize
		from nobel 
		group by prize_share 
		order by count(prize_share) asc 
		limit 1
		) as sub
	)
order by prize_share desc, year asc
limit 5
;

/* # Questão 7 - Com base nos resultados da 6 como base, obtenha a quantidade de premiações por categoria. Ordene-as por quantidade de premiações. */

select category, count(laureate_id)
from nobel
where prize_share = (
	select prize_share
	from (
		select prize_share, count(prize_share) as prize
		from nobel 
		group by prize_share 
		order by count(prize_share) asc 
		limit 1
		) as sub
	)
group by category
order by count(laureate_id) desc
;

*/ # Questão 8 - Utilizando a consulta da resposta anterior, busque pela categoria que obteve acima de 30 honras.Utilize subquery para responder essa pergunta */

select *
from (
	select category, count(laureate_id) as count
	from nobel
	where prize_share = (
		select prize_share
		from (
			select prize_share, count(prize_share) as prize
			from nobel 
			group by prize_share 
			order by count(prize_share) asc 
			limit 1
			) as sub
		)
	group by category
	order by count(laureate_id) desc
	) as big_sub
where big_sub.count > 30
;

*/ 
Dataset: Cervejas. sql e Cervejarias.sql

# Questão 9 - Quais palavras mais comuns para nomes de cervejarias? Liste as mais comuns e limite a quantidade em 4 itens: */

select nome, count(nome)
from (
	select unnest(string_to_array(name,' ')) as nome
	from cervejarias
	) as sub
group by sub.nome
order by count(nome) desc
limit 4
;

/* # Questão 10 - Quais palavras mais comuns para nomes de cervejas? Liste as mais comuns e limite a quantidade em 5 itens: */

select nome, count(nome)
from (
	select unnest(string_to_array(name,' ')) as nome
	from cervejas
	) as sub
group by sub.nome
order by count(nome) desc
limit 5
;

/* # Questão 11 - Agora, busque pelas palavras menos comuns para os nomes de cervejarias, aquelas que são utilizadas apenas uma vez. 
Qual a quantidade de palavras que são usadas apenas uma vez? */

select count(count) from (
	select count(nome) as count
	from (
		select name,unnest(string_to_array(name,' ')) as nome
		from cervejarias
		) as sub
	group by sub.nome
	) as sub2
where sub2.count = 1
;

/* # Questão 12 - Agora, ao invés de cervejarias, busque por palavras menos utilizadas para cervejas, aquelas que são utilizadas apenas uma vez.
Qual a quantidade de palavras que são usadas apenas uma vez? */

select count(count) from (
	select count(nome) as count
	from (
		select name,unnest(string_to_array(name,' ')) as nome
		from cervejas
		) as sub
	group by sub.nome
	) as sub2
where sub2.count = 1
;

/* # Questão 13 - Busque por todas as palavras que apareçam tanto em nome de cervejarias quanto em nome de cervejas, 
qual a quantidade de palavras que entram nessa condição? */

select distinct nomeCerveja as palavras
from (
	select unnest(string_to_array(cervejas.name,' ')) as nomeCerveja
	from cervejas 
	) as sub1
where nomeCerveja in (
	select unnest(string_to_array(cervejarias.name,' ')) as nomeCervejaria
	from cervejarias 
	) 
order by palavras asc
;

/* Dataset: netflix.sql

# Questão 14 - A lista de todos atores ou atrizes que participaram de alguma produção: */

select unnest(string_to_array(casting,', ')) as casting
from netflix 
;

/* # Questão 15 -  Depois, encontre a quantidade de participações em que cada um desses atores e atrizes tiveram: */

select casting, count(show_id)
from (
	select show_id, unnest(string_to_array(casting,', ')) as casting
	from netflix 
	) as sub1
group by casting 
order by count(show_id) desc
;

/* # Questão 16 - Depois, busque os/as 10 que mais tiveram participações: */

select casting, count(show_id)
from (
	select show_id, unnest(string_to_array(casting,', ')) as casting
	from netflix 
	) as sub1
group by casting 
order by count(show_id) desc
limit 10
;

/* # Questão 17 - para a lista de todos os atores e atrizes e suas participações, busque por aqueles que tiveram entre 10 e 30 participações, 
mas não aqueles que tiveram entre 15 e 20 participações: */

select casting, count
from (
	select count(show_id) as count, casting
	from (
		select show_id, unnest(string_to_array(casting,', ')) as casting
		from netflix 
		) as sub2
	group by casting
	) as sub1
where count between '10' and '30' and not (count between '15' and '20')
group by casting , count
order by count desc
;

/* # Questão 18 - com base na lista de todos os atores e atrizes e suas participações,
busque por aqueles que tiveram 10 ou mais participações em produções de países exclusivos (somente um país participou da produção) 
e que não atuaram em filmes indianos (India). */

select casting as name, country, count
from (
	select count(show_id) as count, casting, country
	from (
		select show_id, unnest(string_to_array(casting,', ')) as casting, country
		from netflix 
		) as sub2
	group by casting, country
	) as sub1
where count >= 10 and not (country like '%India%') 
and country in (
	select split_part(country,', ',1)
	from netflix
	)
group by casting , count, country
order by count desc, casting desc
;

/* # Questão 19 - Quais atores ou atrizes atuaram também como diretores em alguma produção. Após encontrar a informações, ordene-a em ordem alfabética. */

select distinct casting as names
from (
	select unnest(string_to_array(casting,', ')) as casting
	from netflix
	) as sub1
where casting in (
	select directors
	from (
		select unnest(string_to_array(director,', ')) as directors, casting
		from netflix 
		 ) as sub2
	)
order by casting asc
;

/* # Questão 20 - A lista das produções realizadas por países exclusivos (apenas um país participou da produção): */

select distinct title
from netflix
where country in ( 
	select split_part(country,', ',1)
	from netflix 
	)
order by title asc
;

/* # Questão 21 - As palavras mais comuns nos títulos para todas as produções de países exclusivos, ordenando-as pela quantidade. Ignore (:, ,,!) no título.*/

select distinct titles, count(titles)
from (  
	select unnest(string_to_array(title,' ')) as titles, country
	from netflix 
	) as sub1
where country in ( 
	select split_part(country,', ',1)
	from netflix 
	)
group by titles
order by count(titles) desc
;

/* # Questão 22 - Utilizando a query anterior como base, busque por palavras que foram utilizadas entre 20 e 40 vezes */

select distinct titles, count
from (
	select titles, count(titles) as count
	from (  
		select unnest(string_to_array(title,' ')) as titles, country
		from netflix 
		) as sub1
	where country in ( 
		select split_part(country,', ',1)
		from netflix 
		)
	group by titles
	) as sub2
where count between '20' and '40'
group by titles, count
order by count desc
; 

/* # Questão 23 - A partir da questão 21, encontre a oitava palavra mais utilizada em títulos: */

select distinct titles, count(titles)
from (  
	select unnest(string_to_array(title,' ')) as titles, country
	from netflix 
	) as sub1
where country in ( 
	select split_part(country,', ',1)
	from netflix 
	)
group by titles
order by count(titles) desc
offset 7
limit 1
;
