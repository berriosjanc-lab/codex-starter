import requests
from tabulate import tabulate
from colorama import Fore, Style, init
from datetime import datetime

# Inicializar colorama
init(autoreset=True)

# Configuración
API_KEY = "ef0a06800e2efe129d8e688acf083343"  # Tu API Key
CIUDAD = "Caguas,PR"
UNITS = "imperial"  # Fahrenheit
URL = f"http://api.openweathermap.org/data/2.5/weather?q={CIUDAD}&appid={API_KEY}&units={UNITS}&lang=es"

# Tips rápidos según el clima
def tip_del_dia(condicion):
    condicion = condicion.lower()
    if "lluvia" in condicion:
        return "🌧 Lleva sombrilla y cuidado con el piso resbaloso."
    elif "nube" in condicion:
        return "☁ El día está nublado, aprovecha para tareas en interior."
    elif "sol" in condicion or "despejado" in condicion:
        return "☀ Disfruta del sol, pero usa protector solar."
    elif "tormenta" in condicion:
        return "⛈ Mantente bajo techo y evita áreas abiertas."
    else:
        return "✨ Mantén una actitud positiva sin importar el clima."

try:
    # Petición a la API
    response = requests.get(URL)
    data = response.json()

    if data.get("cod") != 200:
        print(Fore.RED + "Error al obtener el clima:", data.get("message", ""))
    else:
        condicion = data["weather"][0]["description"].capitalize()
        temperatura = data["main"]["temp"]
        sensacion = data["main"]["feels_like"]
        humedad = data["main"]["humidity"]

        tabla = [
            [Fore.CYAN + "Condición", Fore.WHITE + condicion],
            [Fore.CYAN + "Temperatura (°F)", Fore.YELLOW + f"{temperatura}°F"],
            [Fore.CYAN + "Sensación térmica (°F)", Fore.YELLOW + f"{sensacion}°F"],
            [Fore.CYAN + "Humedad", Fore.GREEN + f"{humedad}%"],
            [Fore.CYAN + "Tip del día", Fore.MAGENTA + tip_del_dia(condicion)]
        ]

        print(Fore.LIGHTWHITE_EX + Style.BRIGHT + "\n⛅ Pronóstico actual para " + CIUDAD + " (" + datetime.now().strftime("%d/%m/%Y %H:%M") + ")\n")
        print(tabulate(tabla, tablefmt="fancy_grid"))

except Exception as e:
    print(Fore.RED + "Ocurrió un error:", str(e))
