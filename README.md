# MusicExpress FrontEnd

<p align="center">
  <img src="figures/footer-logo.png" alt="logo">
</p>

This is the Front-End repository for [MusicExpress Recommender System](http://musicexpress.azurewebsites.net).

The goal of this system is to easily provide music suggestions to different users, considering a couple of playlists: one representing the user's tastes, and the other from which take the recommendations.

> [!NOTE]
> Complete information about how the recommender system works can be found on the [MusicExpress's GitHub repository](https://github.com/se4ai2324-uniba/MusicExpress.git).

Below there is a screenshot of the system:

![Dahboard](/figures/ME-dashboard.png)



## Run on local environment
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.0.7.

> [!IMPORTANT]
> Be sure that Angular is installed on your machine.
> You can find details on how to install it in the [Angular Github repository](https://github.com/angular/angular-cli).

### Install project dependencies
After installing the proper Angular version, run the following command - in the project folder - to install the project dependencies. 

```bash
npm install
```

### Run the local server
Finally, run the following command - in the project folder - to access the **Music Express Front-End**:

```bash
ng serve
```
Navigate to `http://localhost:4200/` and **_enjoy the sound!_**

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
