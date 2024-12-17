# 17/12/2024
- [x] : créer un threejs playground
    - Abrogé. Dès maintenant, tout se passera ici, ça évitera de faire des aller retours.
- [x] : Afficher ma première image
- [ ] : Lister les fonctionnalités de base
- [x] : Permettre de zoomer avec la molette
    - Fait avec un event listener sur le canvas qui écoute wheel. On définit ensuite une position prédéfinie de zoom avec une vitesse de rotation différentiée.
- [x] : Permettre de rotationner
    - Grâce aux OrbitControls.
- [ ] : Pouvoir placer des markers à des endroits
- [ ] : Arriver à afficher les markers pile au centre du clic
- [ ] : Associer à un toggle les markers
- [ ] : Pouvoir associer à ces markers un chemin vers l'image suivante
- [ ] : Pouvoir accéder à une autre image en cliquant sur ce marqueur
- [x] : Convertir en coordonnées sphériques les coordonnées XYZ


# 12/12/2024

Premier jour de Bild. Grande émotion.

Travail à faire :

- [x] : Choisir la library pour afficher les images
    - Ce sera threejs.
- [x] : Apprendre des trucs de base sur threejs...
    - Essentiellement, 3js fonctionne avec un canvas dans lequel on va faire fonctionner un renderer. Ce renderer prend une scène, et une camera. La camera est quelque part, avec une orientation et un champ de vision. La scène a des mesh à partir de géométries et de matériaux qui peuvent eux mêmes être faits à partir de texture.
    - Dans le cas de la vision 360, il suffit de créer une sphère sur laquelle on applique une projection equirectangulaire de deux images dites fisheye. La camera est au centre et ne fait que tourner. Le zoom est assuré par MAJ du FOV. 

