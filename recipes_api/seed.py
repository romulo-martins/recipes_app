from models import Recipe, Session

session = Session()

# Inserção de dados de exemplo
recipes_data = [
  {
    "title": "Pão de Queijo",
    "ingredients": "500g de polvilho doce, 250g de queijo minas padrão ralado, 2 ovos, 1 xícara de leite, 1/2 xícara de óleo, sal a gosto",
    "instructions": "Misture todos os ingredientes em uma tigela até obter uma massa homogênea. Modele os pãezinhos e leve ao forno preaquecido a 180°C por cerca de 25 minutos ou até dourar.",
    "image": "pao_de_queijo.jpg"
  },
  {
    "title": "Risoto de Funghi",
    "ingredients": "1 xícara de arroz arbóreo, 100g de cogumelos funghi secos, 1 cebola picada, 2 dentes de alho picados, 1/2 xícara de vinho branco seco, 1,5 litros de caldo de legumes, 2 colheres de sopa de manteiga, 1/2 xícara de queijo parmesão ralado, sal e pimenta a gosto",
    "instructions": "Hidrate os cogumelos em água morna por 30 minutos. Refogue a cebola e o alho na manteiga até dourarem. Adicione o arroz e refogue por mais alguns minutos. Acrescente o vinho branco e mexa até evaporar. Adicione os cogumelos escorridos e picados. Aos poucos, vá adicionando o caldo de legumes, mexendo sempre até que o arroz esteja al dente e cremoso. Finalize com o queijo parmesão, ajuste o sal e a pimenta e sirva.",
    "image": "risoto_de_funghi.jpg"
  },
  {
    "title": "Salada de Quinoa",
    "ingredients": "1 xícara de quinoa cozida, 1 pepino em cubos, 1 tomate em cubos, 1 pimentão vermelho em cubos, 1/2 cebola roxa picada, suco de 1 limão, 2 colheres de sopa de azeite de oliva, sal e pimenta-do-reino a gosto, folhas de hortelã a gosto",
    "instructions": "Em uma tigela, misture todos os ingredientes. Tempere com suco de limão, azeite, sal, pimenta e folhas de hortelã picadas. Sirva gelada.",
    "image": "salada_de_quinoa.jpg"
  },
  {
    "title": "Frango Assado com Batatas",
    "ingredients": "1 frango inteiro, 1 kg de batatas descascadas e cortadas em pedaços, 4 dentes de alho picados, suco de 1 limão, 1/4 de xícara de azeite de oliva, 1 colher de sopa de páprica doce, sal e pimenta-do-reino a gosto",
    "instructions": "Tempere o frango com sal, pimenta, alho picado e suco de limão. Deixe descansar por 30 minutos. Em uma assadeira, disponha o frango e as batatas. Regue com azeite de oliva e polvilhe a páprica. Asse em forno preaquecido a 200°C por aproximadamente 1 hora ou até que o frango esteja dourado e as batatas estejam macias.",
    "image": "frango_assado_com_batatas.jpg"
  },
  {
    "title": "Macarrão à Carbonara",
    "ingredients": "400g de espaguete, 150g de bacon em cubos, 3 gemas de ovo, 1 xícara de queijo parmesão ralado, pimenta-do-reino moída na hora, sal a gosto",
    "instructions": "Cozinhe o espaguete em água fervente com sal até ficar al dente. Enquanto isso, frite o bacon em uma frigideira até ficar crocante. Em uma tigela, misture as gemas de ovo com o queijo parmesão ralado. Escorra o macarrão, reservando um pouco da água do cozimento. Misture imediatamente o macarrão escorrido com o bacon na frigideira quente. Retire do fogo e adicione a mistura de gemas e queijo, mexendo vigorosamente para que o calor do macarrão cozinhe os ovos, formando um molho cremoso. Tempere com pimenta-do-reino moída na hora e sirva imediatamente.",
    "image": "macarrao_a_carbonara.jpg"
  },
  {
    "title": "Sopa de Legumes",
    "ingredients": "1 cenoura em cubos, 1 batata em cubos, 1 abobrinha em cubos, 1 chuchu em cubos, 1 cebola picada, 2 dentes de alho picados, 1 litro de caldo de legumes, 1 folha de louro, sal e pimenta a gosto, azeite de oliva a gosto",
    "instructions": "Refogue a cebola e o alho no azeite até dourarem. Adicione a cenoura, batata, abobrinha e chuchu em cubos e refogue por mais alguns minutos. Acrescente o caldo de legumes e a folha de louro. Deixe cozinhar em fogo baixo por cerca de 20 minutos ou até os legumes estarem macios. Tempere com sal e pimenta a gosto. Retire a folha de louro e sirva quente.",
    "image": "sopa_de_legumes.jpg"
  },
  {
    "title": "Torta de Limão",
    "ingredients": "1 pacote de bolacha maisena, 100g de manteiga derretida, 1 lata de leite condensado, suco de 5 limões, raspas de limão a gosto, 1 lata de creme de leite",
    "instructions": "Triture a bolacha maisena até formar uma farofa. Misture com a manteiga derretida até obter uma massa homogênea. Forre o fundo de uma forma com a massa, pressionando bem. Em uma tigela, misture o leite condensado com o suco e as raspas de limão. Acrescente o creme de leite e misture até ficar homogêneo. Despeje sobre a massa na forma e leve à geladeira por pelo menos 4 horas antes de servir.",
    "image": "torta_de_limao.jpg"
  },
  {
    "title": "Mousse de Chocolate",
    "ingredients": "200g de chocolate meio amargo, 1 lata de creme de leite sem soro, 3 claras em neve, 3 colheres de sopa de açúcar",
    "instructions": "Derreta o chocolate em banho-maria ou no micro-ondas. Misture o creme de leite ao chocolate derretido. Bata as claras em neve com o açúcar até obter picos firmes. Incorpore delicadamente as claras ao creme de chocolate, misturando com movimentos suaves de baixo para cima. Distribua em taças individuais e leve à geladeira por pelo menos 2 horas antes de servir.",
    "image": "mousse_de_chocolate.jpg"
  },
  {
    "title": "Hambúrguer Caseiro",
    "ingredients": "500g de carne moída, 1 cebola picada, 2 dentes de alho picados, 1 ovo, 1/2 xícara de farinha de rosca, sal e pimenta-do-reino a gosto, queijo, alface, tomate e pão para montagem",
    "instructions": "Em uma tigela, misture a carne moída com a cebola, alho, ovo e farinha de rosca. Tempere com sal e pimenta a gosto. Modele os hambúrgueres e leve para grelhar em uma frigideira quente ou churrasqueira até ficarem dourados e cozidos por dentro. Monte os hambúrgueres com queijo derretido, alface, tomate e outros acompanhamentos de sua preferência.",
    "image": "hamburguer_caseiro.jpg"
  },
  {
    "title": "Molho Pesto",
    "ingredients": "2 xícaras de folhas de manjericão fresco, 1/2 xícara de queijo parmesão ralado, 1/2 xícara de nozes ou pinolis, 2 dentes de alho, 1/2 xícara de azeite de oliva, sal a gosto",
    "instructions": "Em um processador ou liquidificador, triture as folhas de manjericão, queijo parmesão, nozes ou pinolis e alho até obter uma pasta grossa." ,
    "image": "molho_pesto.jpg"
  } 
]

# Inserindo os dados no banco de dados
for recipe_data in recipes_data:
    recipe = Recipe(**recipe_data)
    session.add(recipe)

# Commit das alterações
session.commit()

# Fechamento da sessão
session.close()

print("Dados de receitas inseridos com sucesso!")
