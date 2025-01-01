GUIA PARA AGREGAR MIEMBROS NUEVOS A LA ORGANIZACION DE GITHUB A TRAVES DE LA anaquinpm


1- UTILIZAR LA FUNCION getGithubUsers 
    Vamos a buscar a nuestra base de datos los miembros registrados del nuevo cohorte
    Normalizamos el arreglo
    Generamos un json con fs que luego transformamos en un array a mano

2- UTILIZAR LA FUNCION getInviteIds
    Importamos el archivo con el arreglo de users 
    Iteramos con el endpoint de octokit para traernos el id de cada users
    Generamos un json con fs que luego transformamos en un array a mano

3- UTILIZAMOS LA FUNCION createInvitation
    Importamos el archivo con el arreglo de ids 
    Iteramos con el endpoint de octokit para invitar a cada user a traves de su id 