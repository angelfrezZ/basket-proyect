<template>
  <v-row>
    <v-col v-for="(item , i) in fotos" :key="i" class="d-flex child-flex" cols="12" sm="4">
      <v-img style="cursor: pointer;" :src="item.img">
      </v-img>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data: () => ({
    fotos: [
      { rutas: "/",img: "https://basketworld.com/modules/pspagebuilder/views/img/ZAPATILLAS%20HOME%20JUNIO.jpg" },
      { rutas: "/",img: "https://basketworld.com/modules/pspagebuilder/views/img/nba%20retro%20mayo.jpg" },
      { rutas: "/",img: "https://basketworld.com/modules/pspagebuilder/views/img/Ropa%20NBA%20junior%20diciembre%202021.jpg" },
      { rutas: "/",img: "https://basketworld.com/modules/pspagebuilder/views/img/Mochilas%20diciembre%2021.jpg" },
      { rutas: "/",img: "https://basketworld.com/modules/pspagebuilder/views/img/zapatillas%20junior%20JUNIO.jpg" },
      { rutas: "/",img: "https://basketworld.com/modules/pspagebuilder/views/img/Balones%20diciembre%2021.jpg" },
      { rutas: "/",img: "https://basketworld.com/modules/pspagebuilder/views/img/FOTO%20NOVEDADES%20HOME.jpg" },
      { rutas: "/",img: "https://basketworld.com/modules/pspagebuilder/views/img/Nike__Basket%20World.jpg" },
      { rutas: "/",img: "https://basketworld.com/modules/pspagebuilder/views/img/adidas_Basket%20World.jpg" },
      { rutas: "/",img: "https://basketworld.com/modules/pspagebuilder/views/img/jordan__Basket-World.jpg" },
      { rutas: "/",img: "https://basketworld.com/modules/pspagebuilder/views/img/adidas_Basket%20World.jpg" },
      { rutas: "/",img: "https://basketworld.com/modules/pspagebuilder/views/img/Under-Armour_Basket%20World.jpg" },
    ]
  })
}
</script>