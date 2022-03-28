lista_características = ["Fuerza", "Destreza", "Constitución", "Inteligencia", "Sabiduría", "Carisma",]

lista_clases = ["Bárbaro", "Senda del Berserker", "Senda del Guerrero Totémico", "Bardo", "Colegio del Conocimiento", "Colegio del Valor",
                "Brujo", "el Archihada", "el Diablo", "el Gran Antiguo", "Clérigo", "Conocimiento", "Vida", "Luz", "Naturaleza", "Tempestad",
                "Superchería", "Guerra", "Druida", "Círculo de la Tierra", "el Círculo de la Luna", "Explorador", "Cazador", "Señor de las Bestias",
                "Guerrero", "Caballero Arcano", "Campeón", "Maestro de Batalla", "Hechicero", "Línea de sangre Dracónica", "Magia Salvaje",
                "Mago", "Abjuración", "Adivinación", "Conju-ración", "Encantamiento", "Evocación", "Ilusión", "Nigromancia", "Transmutación",
                "Monje", "Camino de la Mano Abierta", "Camino de la Sombra", "Camino de los Cuatro Elementos", "Paladín","Juramento de Devoción",
                "Juramento de los Ancestros", "Juramento de Venganza", "Pícaro", "Ladrón", "Asesino", "Bribón Arcano"]

lista_habilidades = ["Atletismo", "Acrobacias", "Juego de Manos", "Sigilo", "Arcano", "Historia",
                     "Investigación", "Naturaleza", "Religión", "Trato de animales", "Medicina", "Percepción", "Perspicacia", "Supervivencia",
                     "Engaño", "Intimidación", "Interpretación", "Persuasión"]

lista_alineamientos = ["Legal Bueno", "Neutral Bueno", "Caótico Bueno", "Legal Neutral",
                      "Neutral", "Caótico Neutral", "Legal Malvado", "Neutral Malvado", "Caótico Malvado"]

lista_trasfondos = ["Acólito", "Artesano Gremial", "Artista", "Charlatán", "Criminal", "Ermitaño", "Forastero",
                  "Héroe del Pueblo", "Huérfano", "Marinero", "Noble", "Sabio", "Soldado"]

razas = {
  "Dracónido": {
    "Aumento de característica": {"Fuerza": 2, "Carisma": 1},
    "Velocidad": 30,
    "Competencias": [],
    "Lenguajes": [],
    "Features": []
  },
  "Alto Elfo": {
    "Aumento de característica": [],
    "Velocidad": 30,
    "Competencias": [],
    "Lenguajes": [],
    "Features": []
  },
  "Elfo de los Bosques": {
    "Aumento de característica": [],
    "Velocidad": 30,
    "Competencias": [],
    "Lenguajes": [],
    "Features": []
  },
  "Elfo Oscuro (Drow)": {
    "Aumento de característica": [],
    "Velocidad": 30,
    "Competencias": [],
    "Lenguajes": [],
    "Features": []
  },
  "Enano de las Colinas": {
    "Aumento de característica": [],
    "Velocidad": 30,
    "Competencias": [],
    "Lenguajes": [],
    "Features": []
  },
  "Enano de las Montañas": {
    "Aumento de característica": [],
    "Velocidad": 30,
    "Competencias": [],
    "Lenguajes": [],
    "Features": []
  },
  "Gnomo del Bosque": {
    "Aumento de característica": [],
    "Velocidad": 30,
    "Competencias": [],
    "Lenguajes": [],
    "Features": []
  },
  "Gnomo de la Roca": {
    "Aumento de característica": [],
    "Velocidad": 30,
    "Competencias": [],
    "Lenguajes": [],
    "Features": []
  },
  "Humano": {
    "Aumento de característica": [],
    "Velocidad": 30,
    "Competencias": [],
    "Lenguajes": [],
    "Features": []
  },
  "Mediano Piesligeros": {
    "Aumento de característica": [],
    "Velocidad": 30,
    "Competencias": [],
    "Lenguajes": [],
    "Features": []
  },
  "Mediano Fornido": {
    "Aumento de característica": [],
    "Velocidad": 30,
    "Competencias": [],
    "Lenguajes": [],
    "Features": []
  },
  "Semielfo": {
    "Aumento de característica": [],
    "Velocidad": 30,
    "Competencias": [],
    "Lenguajes": [],
    "Features": []
  },
  "Semiorco": {
    "Aumento de característica": [],
    "Velocidad": 30,
    "Competencias": [],
    "Lenguajes": [],
    "Features": []
  },
  "Tiefling": {
    "Aumento de característica": [],
    "Velocidad": 30,
    "Competencias": [],
    "Lenguajes": [],
    "Features": []
  },
}

lista_herramientas = {
    "Herramientas de artesano": ["Herramientas de albañil", "Herramientas de alfarero", "Herramientas de carpintero",
                      "Herramientas de cartógrafo", "Herramientas de constructor", "Herramientas de herrero","Herramientas de joyero",
                      "Herramientas de peletero", "Herramientas de pintor", "Herramientas de soplador de vidrio",
                      "Herramientas de tallador de madera","Herramientas de tejedor", "Herramientas de zapatero", "Suministros de alquimista",
                      "Suministros de calígrafo","Suministros de cervecero", "Utensilios de cocinero", "Kit de disfraz", "Kit de falsificación",
                      "Herramientas de ladrón","Herramientas de navegante"],
    "Instrumento musical": ["Caramillo", "Cuerno", "Dulcimer", "Flauta", "Flauta de pan", "Gaita", "Laúd", "Lira", "Tambor", "Viola" ],
    "Juegos": ["Juego de cartas", "Juego de dados", "Kits", "Kit de envenenador", "Kit de herborista"],
}

lista_idiomas = ["Común Enano", "Élfico", "Gigante", "Gnómico", "Goblin", "Mediano", "Orco", "Abisal", "Celestial", "Dracónico", "Habla Profunda",
                "Infernal", "Primordial", "Silvano", "Infracomún"]

lista_armaduras = {
    "Armaduras ligeras": ["Acolchada", "Cuero", "Cuero tachonado"],
    "Armaduras medias": ["Pieles", "Camisote de mallas", "Cota de escamas", "Coraza", "Semiplacas"],
    "Armaduras pesadas": ["Armaduras pesadas", "Cota de mallas", "Bandas", "Placas"],
    "Escudo" : "Escudo"
}

lista_armas = {
    "Armas c/c simples":[ "Bastón", "Daga", "Golpe desarmado", "Gran clava", "Hacha de mano", "Hoz", "Jabalina", "Lanza", "Martillo ligero",
               "Maza", "Clava"],
    "Armas a distancia simples": ["Arco corto", "Ballesta ligera", "Dardo", "Honda"],
    "Armas c/c marciales": ["Alabarda", "Atarraga", "Cimitarra", "Espada corta", "Espada larga", "Espadón", "Estoque", "Hacha de batalla", "Gran hacha", "Guja",
               "Lanza de caballería", "Látigo", "Lucero del alba", "Martillo de guerra", "Mayal", "Pica", "Pica de guerra", "Tridente"],
    "Armas a distancia marciales": ["Arco largo", "Ballesta de mano", "Ballesta pesada", "Cerbatana", "Red"]
}

conjuros_bardo ={
    "Nivel 0": ["Burla cruel", "Cuchichear mensaje", "Ilusión menor", "Impacto verdadero", "Luces danzantes", "Luz", "Mano del mago",
                 "Prestidigitación"],
    "Nivel 1":["Encantar Animal", "Caer como una pluma", "Comprensión idiomática", "Curar heridas", "Detectar magia",
                 "Disfrazarse", "Dormir", "Escritura ilusoria", "Fuego feérico", "Hablar con los animales", "Hechizar persona", "Heroísmo",
                 "Identificar", "Imagen silenciosa", "Onda atronadora", "Palabra curativa", "Perdición", "Sirviente invisible", "Terribles carcajadas",
                 "Zancada prodigiosa"],
    "Nivel 2":["Abrir", "Mensajero Animal", "Boca mágica", "Calentar metal", "Calmar emociones", "Cautivar",
                 "Ceguera/sordera", "Detectar pensamientos", "Estallar", "Inmovilizar persona", "Invisibilidad", "Localizar animales o plantas",
                 "Localizar objeto", "Mejorar característica", "Restablecimiento menor", "Silencio", "Sugestión", "Ver lo invisible", "Zona de verdad"],
    "Nivel 3":["Clarividencia", "Crecimiento vegetal", "Cubículo", "Disipar magia", "Don de lenguas", "Glifo custodio", "Hablar con las plantas",
                 "Hablar con los muertos", "Imagen mayor", "Indetectabilidad", "Lanzar maldición", "Miedo", "Nube apestosa", "Pauta hipnótica", "Recado"],
    "Nivel 4":["Compulsión", "Confusión", "Invisibilidad mayor", "Libertad de movimiento", "Localizar criatura", "Polimorfar", "Puerta dimensional"],
    "Nivel 5":["Animar objetos", "Círculo de teletransporte", "Conocimiento de leyendas", "Curar heridas en grupo", "Doble engañoso", "Dominar persona",
                 "Dotar de consciencia", "Escudriñar", "Geas", "Inmovilizar monstruo", "Ligadura de los planos", "Modificar recuerdo", "Restablecimiento mayor",
                 "Revivir a los muertos", "Similitud", "Soñar"],
    "Nivel 6":["Baile irresistible", "Encontrar la senda", "Guardas y custodias", " Ilusión programada",
                 "Mirada penetrante", "Sugestión en grupo", "Visión verdadera"],
    "Nivel 7":["Espada arcana", "Espejismo arcano", "Etereidad", "Jaula de fuerza",
                 "Magnífica mansión", "Proyectar imagen", " Regenerar", "Resurrección", "Símbolo", "Teleportar"],
    "Nivel 8":["Debilidad mental",
                 "Dominar monstruo", "Labia", "Mente en blanco", "Palabra de poder aturdidor"],
    "Nivel 9":["Palabra de poder mortal", "Polimorfar verdadero", "Presciencia"]
}


conjuros_brujo = {
    "Nivel 0": ["Explosión sobrenatural", "Ilusión menor", "Impacto verdadero", "Mano del mago", "Prestidigitación", "Rociar veneno",
                  "Toque helado"],
    "Nivel 1": ["Comprensión idiomática", "Escritura ilusoria", "Hechizar persona", "Protección contra el mal y el bien",
                  "Represión infernal", "Retirada expeditiva", "Sirviente invisible"]
}

conjuros_clerigo = {
    "Nivel 0": ["Disipar la agonía", "Llama sagrada", "Luz", "Orientación divina", "Remendar", "Resistencia", "Taumaturgia"],
    "Nivel 1": ["Bendecir", "Crear o destruir agua", "Curar heridas", "Detectar el mal y el bien", "Detectar magia", "Detectar veneno y enfermedad",
                    "Escudo de la fe", "Infligir heridas", "rden imperiosa", "Palabra curativa", "Perdición", "Protección contra el mal y el bien",
                    "Purificar comida y bebida", "Rayo guía", "Santuario"]
}

conjuros_druida = {
    "Nivel 0": ["Conocimiento druídico", "Flamear", "Garrote", "Orientación divina", "Remendar", "Resistencia", "Rociar veneno"],
    "Nivel 1": ["Encantar Animal", "Buenas bayas", "Crear o destruir agua", "Curar heridas", "Detectar magia",
                   "Detectar veneno y enfermedad", "Enmarañar", "Fuego feérico", "Hablar con los animales", "Hechizar persona", "Nube brumosa",
                   "Onda atronadora", "Palabra curativa", "Purificar comida y bebida", "Salto", "Zancada prodigiosa"]
}

conjuros_explorador = {
    "Nivel 1": ["Alarma", "Encantar Animal", "Buenas bayas", "Curar heridas", "Detectar magia", "Detectar veneno y enfermedad",
                       "Hablar con los animales", "Marca del cazador", "Nube brumosa", "Salto", "Zancada prodigiosa"]
}

conjuros_hechicero = {
    "Nivel 0": ["Contacto electrizante", "Cuchichear mensaje", "Ilusión menor", "Impacto verdadero", "Luces danzantes", "Luz",
                       "Mano del mago", "Prestidigitación", "Rayo de escarcha", "Rayo de fuego", "Remendar", "Rociar veneno", "Salpicadura de ácido",
                       "Toque helado"],
    "Nivel 1": ["Armadura de mago", "Caer como una pluma", "Comprensión idiomática", "Detectar magia", "Disfrazarse",
                       "Dormir", "Escudo", "Falsa vida", "Hechizar persona", "Imagen silenciosa", "Manos ardientes", "Nube brumosa", "Onda atronadora",
                       "Proyectil mágico", "Retirada expeditiva", "Rociada de color", "Salto"]
}

conjuros_mago = {
    "Nivel 0": ["Contacto electrizante", "Cuchichear mensaje", "Ilusión menor", "Impacto verdadero", "Luces danzantes", "Luz",
                 "Mano del mago", "Prestidigitación", "Rayo de escarcha", "Rayo de fuego", "Remendar", "Rociar veneno", "Salpicadura de ácido",
                 "Toque helado"],
    "Nivel 1": ["Alarma", "Armadura de mago", "Caer como una pluma", "Comprensión idiomática", "Detectar magia",
                 "Disco flotante", "Disfrazarse", "Dormir", "Encontrar familiar", "Escritura ilusoria", "Escudo", "Falsa vida", "Grasa",
                 "Hechizar persona", "Identificar", "Imagen silenciosa", "Manos ardientes", "Nube brumosa", "Onda atronadora",
                 "Protección contra el mal y el bien", "Proyectil mágico", "Retirada expeditiva", "Rociada de color", "Salto", "Sirviente invisible",
                 "Terribles carcajadas", "Zancada prodigiosa"]
}

conjuros_paladín = {
    "Nivel 1": ["Bendecir", "Curar heridas", "Detectar el mal y el bien", "Detectar magia", "Detectar veneno y enfermedad",
                    "Escudo de la fe", "Favor divino", "Heroísmo", "Orden imperiosa", "Protección contra el mal y el bien", "Purificar comida y bebida"]
}

def eleccion_trasfondo(nombreTrasfondo):
    return {
        "Acólito" : 1,
        "Artesano Gremial": 1,
        "Artista": 1,
        "Charlatán": 1,
        "Criminal": 1,
        "Ermitaño": 1,
        "Forastero": 1,
        "Héroe del Pueblo": 1,
        "Huérfano": 1,
        "Marinero": 1,
        "Noble": 1,
        "Sabio": 1,
        "Soldado": 1,
    }[nombreTrasfondo]

campoNombre = ""

