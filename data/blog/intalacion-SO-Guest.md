---
title: "Instalación Sistema Operativo Guest KVM"
date: '2023-04-11'
lastmod: '2023-04-11'
tags: ['Linux', 'Virtualizacion', 'Kvm', 'Software libre']
draft: false
images: ['']
authors: ['tafur']
summary: 'Un SO Guest en KVM es un sistema operativo virtualizado que se ejecuta en una máquina virtual en un hipervisor KVM.'
---

## ¿Que es un SO Guest?

En el contexto de KVM, un SO Guest es un sistema operativo invitado que se ejecuta en una máquina virtual (VM) creada por KVM. El KVM (Kernel-based Virtual Machine) es una tecnología de virtualización de código abierto para sistemas operativos basados en Linux que permite a los usuarios crear y ejecutar VM.

El SO Guest se ejecuta dentro de la VM y se comporta como si estuviera funcionando en una máquina física independiente, aunque en realidad está ejecutándose en una VM. El SO Guest tiene su propio conjunto de recursos virtuales asignados, como CPU, RAM, almacenamiento y dispositivos de red, y puede ejecutar sus propias aplicaciones y servicios.

El uso de KVM y SO Guest puede proporcionar una mayor eficiencia de recursos y flexibilidad para los entornos de TI, ya que se pueden ejecutar varios sistemas operativos invitados en un solo servidor físico. También permite la creación de entornos de prueba y desarrollo aislados y seguros para experimentar con diferentes sistemas operativos o aplicaciones sin afectar al entorno de producción.

### Instalacion

Para realizar este proceso se debe abrir el gestor de máquinas virtuales que istalamos en la [publicacion](/blog/instalacion-kvm)anterior.

![Gestor de maquinas virtuales](/static/images/instalacionSOG/gest.png)

Luego de esto se le da clic derecho a QEMU/KVM y en new Para poder crear máquinas virtuales.

![QEMU/KVM](/static/images/instalacionSOG/qemu.png)

En la pestaña que se abre se nos permite crear máquinas virtuales, en esta se seleccionará la forma de instalación que se quiere utilizar: mediante una imagen ISO o de CDROM, instalación de red (HTTP, FTP, NFS), Network boot (PXE) o mediante la importación de una imagen ya existente.

![Medio de isntalacion](/static/images/instalacionSOG/op_iso.png)

Una vez seleccionada la forma de instalación  (en este caso, imagen ISO), se abrirá una ventana donde se nos pedirá seleccionar el archivo, en este se debe seleccionar “Explore localmente y ubicar el ISO del sistema operativo a instalar

![ISO](/static/images/instalacionSOG/iso.png)

Teniendo ya ubicada la imagen, el programa buscará automáticamente la fuente de instalación y le pondrá el nombre de esta, siempre y cuando la detección automática esté activada.

![automatica](/static/images/instalacionSOG/automatica.png)

Una vez culminado lo anterior, el procedimiento a seguir es seleccionar la configuración de memoria y CPU que se le dará  a nuestra máquina virtual, hay que tener en cuenta que estas configuraciones se prestarán del anfitrión, por lo cual se debe tener cuidado a la hora de su configuración.

![CPU y Memoria](/static/images/instalacionSOG/cpuYmen.png)

Ahora debemos elegir la cantidad de almacenamiento que designaremos para que sean usadas por nuestra máquina virtual (se deben tener en cuenta los requisitos mínimos del SO a usar).

![Alamcenamiento](/static/images/instalacionSOG/alamcen.png)

A continuación se muestran las configuraciones rápidas que se han programado para la instalación. clic en finalizar y después empezará la instalación del SO

![InsSO](/static/images/instalacionSOG/insSO.png)

Al continuar se  comenzará la ejecución de la máquina virtual y se procederá a instalar el SO.
![pantalla de instalacion](/static/images/instalacionSOG/panIns.png)
