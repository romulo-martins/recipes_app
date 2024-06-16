from sqlalchemy import Column, String, Integer, Text, DateTime
from typing import Union

from models import Base

class Recipe(Base):
    __tablename__ = 'recipe'

    id = Column(Integer, primary_key=True)
    title = Column(String(100), nullable=False)
    ingredients = Column(Text)
    instructions = Column(Text)
    
    def __init__(self, title:str, ingredients:str,
                 instructions:str, created_at:Union[DateTime, None] = None):
        """
        Cria uma receita (Recipe)

        Arguments:
            title: nome da receita.
            ingredients: ingredientes utilizados na receita.
            instructions: instruções para realizar a receita.
            created_at: data de quando a receita foi inserida na base de dados.
        """
        self.title = title
        self.ingredients = ingredients
        self.instructions = instructions

        if created_at:
            self.created_at = created_at