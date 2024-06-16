from sqlalchemy_utils import database_exists, create_database
from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine
import os

# importando os elementos definidos no modelo
from models.base import Base
from models.recipe import Recipe

DB_PATH = "database/"
# Verifica se o diretorio não existe
if not os.path.exists(DB_PATH):
   # então cria o diretorio
   os.makedirs(DB_PATH)

# url de acesso ao banco (essa é uma url de acesso ao sqlite local)
DB_URL = 'sqlite:///%s/db.sqlite3' % DB_PATH

# cria a engine de conexão com o banco
engine = create_engine(DB_URL, echo=False)

# Instancia um criador de seção com o banco
Session = sessionmaker(bind=engine)

# cria o banco se ele não existir 
if not database_exists(engine.url):
    create_database(engine.url) 

# cria as tabelas do banco, caso não existam
Base.metadata.create_all(engine)