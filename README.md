# MusicExpress FrontEnd

<p align="center">
  <img src="figures/footer-logo.png" alt="logo">
</p>

This is the Front-End repository for [MusicExpress Recommender System](http://musicexpress.azurewebsites.net).

The goal of this system is to easily provide music suggestions to different users, considering a couple of playlists: one representing the user's tastes, and the other from which take the recommendations.

> [!NOTE]
> Complete information about how the recommender system works can be found on the [MusicExpress's GitHub repository](https://github.com/se4ai2324-uniba/MusicExpress.git).

Below there is a screen-shot of the system:

![Dahboard](/figures/ME-dashboard.png)



## Run on local environment
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.0.7, so be sure that it's installed on your machine.

### Install project dependencies
After installing the proper Angular version, it's necessary to install the project dependencies. 
So, run the following command in the project folder:
```bash
npm install
```

### Run the local server
Finally, you can run it executing the following command in the project folder:
```bash
ng serve
```
Navigate to `http://localhost:4200/` and **enjoy the sound!**

> [!NOTE]
> The application will automatically reload if you change any of the source files.


## Citation

```bibtex
@misc{MusicRecommendationUsingClusters,
author = {Rinaldi Ivan and, de Benedictis Salvatore and, Sibilla Antonio and, Laraspata Lucrezia},
title = {Music Recommendation using the K-Medoids Clustering Model},
month = {October},
year = {2023},
model_url = {https://github.com/se4ai2324-uniba/MusicExpress},
frontend_url = {https://github.com/llaraspata/MusicExpress-FrontEnd.git}
}
```