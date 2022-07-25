<template>
	<div>
		<v-row class="mt-5">
			<v-col cols="12" sm="6">
				<div>
					<img width="90%" :src="img" alt="">
				</div>
			</v-col>
			<v-col>
				<div>
					<h2 class="mb-10">{{ titulo }}</h2>
					<div>
						<h2 style="width:150px;" class="warning text-center mb-5">US {{ precio | toCurrency }}</h2>
					</div>
					<v-form ref="form" v-model="valid" lazy-validation>
						<div class="mb-10">
							<v-select v-model="$store.state.tallaSeleccionada" style="width:150px;" outlined dense
								:items="$store.state.talla" :rules="[v => !!v]" label="Talla" required>
							</v-select>
							<v-text-field v-model="$store.state.cantidad" hide-details type="number" outlined dense
								style="width:150px;" :rules="[v => !!v]" label="Cantidad" min="0" max="400" required>
							</v-text-field>
							<div style="color:red ;" v-if="$store.state.cantidad > 50">
								Las compras están limitadas a 50 por comprador
							</div>
							<div v-if="$store.state.cantidad == 0" style="color:red;">
								Ingresa una cantidad de 1 o más
							</div>
							<div v-if="$store.state.cantidad < 0" style="color:red;">
								Por favor, introduzca una cantidad válida.
							</div>
						</div>
						<v-btn color="primary" @click="validate" class="mr-4 mb-10">
							<v-icon class="mr-4 ">mdi-receipt-text-check-outline</v-icon>Proceder al checkout
						</v-btn>
					</v-form>
				</div>
				<v-expansion-panels>
					<v-expansion-panel>
						<v-expansion-panel-header>Envios</v-expansion-panel-header>
						<v-expansion-panel-content>
							{{ envios }}
						</v-expansion-panel-content>
					</v-expansion-panel>
					<v-expansion-panel>
						<v-expansion-panel-header>Descripcion</v-expansion-panel-header>
						<v-expansion-panel-content>
							{{ descripcion }}
						</v-expansion-panel-content>
					</v-expansion-panel>
				</v-expansion-panels>
			</v-col>
		</v-row>
	</div>
</template>

<script>
import { doc, getDoc, } from "firebase/firestore";

export default {
	data: () => ({
		titulo: '',
		precio: 0,
		img: "",
		envios: "",
		descripcion: "",
		valid: true,
	}),
	mounted() {
		this.initialize()
	},
	methods: {
		async initialize() {
			const categoria = 'categoria/camisetas/mercancia'
			const docRef = doc(this.$store.state.db, categoria, this.$route.params.id);
			const docSnap = await getDoc(docRef);

			if (docSnap.exists()) {
				this.titulo = docSnap.data().titulo
				this.precio = docSnap.data().precio
				this.img = docSnap.data().img
				this.envios = docSnap.data().informacion.envios
				this.descripcion = docSnap.data().informacion.descripcion
			} else {
				console.log("No such document!");
			}
		},
		validate() {
			if (this.$refs.form.validate() == "") {
				this.$refs.form.validate()
			} else if (this.$store.state.cantidad == 0) {
				this.$refs.form.validate()
			} else if (this.$store.state.cantidad < 0) {
				this.$refs.form.validate()
			} else if (this.$store.state.cantidad > 50) {
				this.$refs.form.validate()
			} else this.$router.push(`/camisetas/${this.$route.params.id}/comprar`)
		}
	}
}
</script>	