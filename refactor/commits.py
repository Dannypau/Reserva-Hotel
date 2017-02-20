import subprocess
import random
import time
import os
import loremipsum
import sys

a=['ajustes necesarios','reformular codigo','refactorizacion','correccion de error en','bug corregido en','cambios finales para ']
arch=['cliente.js','vista.ejs','prueba.html','habitacion.js','reserva.js','crearHabitaciones.html','ClientController.js','HabitacionController.js','ReservaController.js','HuespedController.js','Cliente.ejs','registrohuespedes.ejs']
for i in range(1,8):
 subprocess.call(['git','config','user.name',sys.argv[1]])
 subprocess.call(['git','config','user.email',sys.argv[2]])
 txt=loremipsum.Generator().generate_paragraph()[2]
 aux=random.choice(arch)
 com='echo '+txt+' >> '+aux
 subprocess.Popen(com, shell=True, stderr=subprocess.PIPE)
 print '---------'
 print '--------'
 os.system('git add .')
 subprocess.call(['git','commit','-m',random.choice(a)+' '+aux])
 time.sleep(90)
