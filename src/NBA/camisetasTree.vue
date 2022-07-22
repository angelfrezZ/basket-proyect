	<template>
	<div>
		<v-row class="mt-5">
			<v-col cols="12" sm="6">
				<v-card class="text-center" elevation="24" width="70%">
					<h1>Tu compra</h1>
					<v-img width="70%" :src="img" alt=""></v-img>
					<h4 class="mb-10">{{ titulo }}</h4>
					<v-select v-model="$store.state.tallaSeleccionada" style="width:150px;" outlined dense
						:items="$store.state.talla" :rules="[v => !!v]" label="Talla" required>
					</v-select>
					<v-text-field class="mb-5" v-model="$store.state.cantidad" hide-details type="number" outlined dense
						style="width:150px;" :rules="[v => !!v]" label="Cantidad" min="0" required>
					</v-text-field>
					<label style="width:150px;">Precio de la camiseta: <strong>US {{ precio |
							toCurrency
					}}</strong></label>
				</v-card>
			</v-col>

			<v-col>
				<v-card class="mx-auto mb-10" elevation="20" max-width="330">
					<v-card-text>
						<div>
							<label style="margin-right:90px ;">Subtotal ({{$store.state.cantidad}} artículos)</label>
							<label>{{ $store.state.cantidad * precio | toCurrency }}</label>

						</div>
						<div class="mb-5">
							<label style="margin-right:183px ;">Envio</label>
							<label>{{ envio | toCurrency }}</label>
						</div>
						<label class="text-h6 mr-10">Total de la compra:</label>
						<label class="text-h6">{{ $store.state.cantidad * precio + envio | toCurrency }}</label>
					</v-card-text>
					<v-card-actions>
						<v-btn @click="boton" dark block color="red">
							<v-icon>mdi-lock</v-icon>Pagar
						</v-btn>
					</v-card-actions>
				</v-card>

				<v-form ref="form" v-model="valid" lazy-validation>
					<v-text-field outlined dense v-model="name" :rules="[v => !!v || 'Name is required']" label="Name"
						required></v-text-field>
					<v-text-field outlined dense v-model="lastName" :rules="[v => !!v || 'Lasname is required']"
						label="Lasname" required></v-text-field>
					<v-select outlined dense v-model="select" :items="items"
						:rules="[v => !!v || 'Country is required']" label="Country" required></v-select>
					<v-text-field outlined dense v-model="direccion" :rules="[v => !!v || 'address is required']"
						label="address" required></v-text-field>
					<v-text-field outlined dense v-model="cuidad" :rules="[v => !!v || 'City is required']" label="City"
						required></v-text-field>
					<v-text-field outlined dense v-model="email" :rules="emailRules" label="E-mail" required>
					</v-text-field>
					<v-text-field outlined dense v-model="Phone" :rules="[v => !!v || 'Phone is required']"
						label="Phone" required></v-text-field>

					<v-btn color="success" class="mr-4" @click="validate">
						Listo
					</v-btn>

					<v-btn color="error" class="mr-4" @click="reset">
						Reset Form
					</v-btn>
				</v-form>
			</v-col>
		</v-row>
	</div>
</template>

	<script>
	import { doc, getDoc, getFirestore } from "firebase/firestore";
	import firebase from "@/firebase";
	
	export default {
		data: () => ({
			envio: 20,
			Cantidad: "90",
			titulo: '',
			precio: 0,
			img: "",
			valid: true,
			name: '',
			lastName: '',
			email: '',
			emailRules: [
				v => !!v || 'E-mail is required',
				v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
			],
			select: null,
			items: [
				'Item 1',
				'Item 2',
				'Item 3',
				'Item 4',
			],
		}),
		mounted() {
			this.initialize()
		},
		methods: {
			async initialize() {
				const db = getFirestore(firebase.app)
				const categoria = 'categoria/camisetas/mercancia'
				const docRef = doc(db, categoria, this.$route.params.id);
				const docSnap = await getDoc(docRef);
	
				if (docSnap.exists()) {
					this.titulo = docSnap.data().titulo
					this.precio = docSnap.data().precio
					this.img = docSnap.data().img
				} else {
					console.log("No such document!");
				}
			},
			validate() {
				this.$refs.form.validate()
			},
			reset() {
				this.$refs.form.reset()
			},
			boton() {
				this.$refs.form.validate()
			}
		}
	}
	</script>	