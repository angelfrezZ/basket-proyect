	<template>
	<div>
		<v-row class="mt-5 mb-10">
			<v-col cols="12" sm="6">
				<v-card elevation="24" width="70%">
					<label class="text-h4">Tu compra</label>
					<v-img width="70%" :src="img"></v-img>
					<h4 class="mb-5">{{ titulo }}</h4>
					<div>
						<v-form ref="talla" v-model="valid" lazy-validation>
						<v-select v-model="$store.state.tallaSeleccionada" style="width:150px;" outlined dense
							:items="$store.state.talla" :rules="[v => !!v]" label="Talla" required>
						</v-select>
						<v-text-field v-model="$store.state.cantidad" hide-details 	type="number" outlined dense
							style="width:150px;" :rules="[v => !!v]" label="Cantidad" min="0" max="400" required>
						</v-text-field>
						</v-form>
					</div>
					<div class="mb-5">
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
					<label style="width:150px;">Precio de la camiseta: <strong>US {{ precio |
							toCurrency
					}}</strong></label>
				</v-card>
			</v-col>

			<v-col>
				<v-card class="mb-10" elevation="20" max-width="430">
					<v-card-text>
						<div>
							<label style="margin-right:100px;">Subtotal ({{ $store.state.cantidad }} articulos)</label>
							<label>US {{ $store.state.cantidad * precio | toCurrency }}</label>
						</div>
						<div class="mb-5">
							<label style="margin-right:200px ;">Envio</label>
							<label>US {{ envio | toCurrency }}</label>
						</div>
						<label class="text-h6 mr-10">Total de la compra:</label>
						<label class="text-h6">US {{ $store.state.cantidad * precio + envio | toCurrency }}</label>
					</v-card-text>
				</v-card>
				<div class="mb-10" style="margin-left:90px ;">
					<h3>¿Ya tienes una cuenta?
					</h3>
					<div>
						<a href="/register">Registrate</a> o
						<a href="/login">Inicia sesion</a>
					</div>
				</div>

				<v-form ref="form" class="mb-8" v-model="valid" lazy-validation>
					<v-text-field outlined dense v-model="name" :rules="[v => !!v || 'Name is required']" label="Name"
						required></v-text-field>
					<v-text-field outlined dense v-model="lastName" :rules="[v => !!v || 'Lasname is required']"
						label="Lasname" required></v-text-field>
					<v-autocomplete outlined dense ref="country" v-model="country"
						:rules="[() => !!country || 'Country is required']" :items="countries" label="Country"
						placeholder="Select..." required></v-autocomplete>
					<v-text-field outlined dense v-model="direccion" :rules="[v => !!v || 'Address is required']"
						label="Address" required></v-text-field>
					<v-text-field outlined dense v-model="cuidad" :rules="[v => !!v || 'City is required']" label="City"
						required></v-text-field>
					<v-text-field outlined dense v-model="email" :rules="emailRules" label="E-mail" required>
					</v-text-field>
					<v-text-field outlined dense v-model="Phone" :rules="[v => !!v || 'Phone is required']"
						label="Phone" required></v-text-field>

					<v-btn @click="boton" class="mr-4" dark color="success">
						<v-icon>mdi-lock</v-icon>Pagar
					</v-btn>

					<v-btn color="error" class="mr-4" @click="reset">
						Reset Form
					</v-btn>
				</v-form>
			</v-col>
		</v-row>
		<v-row>
			<v-col cols="12" sm="4">
				<label style="display: block;">
					Atención al cliente
				</label>
				<ul>
					<li class="mb-3">
						<router-link style="color: black;" to="">Ayuda</router-link>
					</li>
					<li class="mb-3">
						<router-link style="color: black;" to="">Localizador de envios</router-link>
					</li>
					<li>
						<router-link style="color: black;" to="">Guia de tallas</router-link>
					</li>
				</ul>
			</v-col>
			<v-col>
				<label>
					Seguridad Online
				</label>
				<ul>
					<li class="mb-3">
						<router-link style="color: black;" to="">Compra segura</router-link>
					</li>
					<li class="mb-3">
						<router-link style="color: black;" to="">Envios y entregas</router-link>
					</li>
					<li>
						<router-link style="color: black;" to="">Plaza de devolucion de 90 dias</router-link>
					</li>
				</ul>
			</v-col>
			<v-col>
				<label>
					Información
				</label>
				<ul>
					<li class="mb-3">
						<router-link style="color: black;" to="">Mi cuenta</router-link>
					</li>
					<li>
						<router-link style="color: black;" to="">Sobres nosotros</router-link>
					</li>
				</ul>
			</v-col>
			<v-col>
				<label>Mantente informado acerca de ofertas, nuevos productos y más</label>
				<v-dialog v-model="dialog" width="500">
					<template v-slot:activator="{ on, attrs }">
						<v-btn class="mb-3 mt-4" color="success" block dark v-bind="attrs" v-on="on">
							REGISTRATE Y AHORRA UN 10%
						</v-btn>
					</template>

					<v-card>
						<v-card-title>
							<span class="text-h5">¡Ahorra un 10% de immediato!*</span>
						</v-card-title>
						<v-card-title>
							<h5>Consigue un 10% de descuento en tu primer pedido y otras ofertas a través de correo
								electrónico exclusivas. Introduce tu información debajo.</h5>
						</v-card-title>
						<v-card-text>
							<v-col cols="12">
								<v-text-field label="Name*" required></v-text-field>
							</v-col>
							<v-col cols="12">
								<v-text-field label="Lastname*" required></v-text-field>
							</v-col>
							<v-col cols="12">
								<v-text-field label="Email*" required></v-text-field>
							</v-col>
							<v-col cols="12">
								<v-text-field label="Password*" type="password" required></v-text-field>
							</v-col>
						</v-card-text>
						<v-card-actions>
							<v-spacer></v-spacer>
							<v-btn color="blue darken-1" text @click="dialog = false">
								Registrate ahora
							</v-btn>
						</v-card-actions>
					</v-card>
				</v-dialog>
				<h3>Conecta con nosotros</h3>
				<div>
					<v-btn class="mx-2" fab dark small color="primary">
						<v-icon dark>
							mdi-facebook
						</v-icon>
					</v-btn>
					<v-btn class="mx-2" fab dark small color="pink">
						<v-icon dark>
							mdi-instagram
						</v-icon>
					</v-btn>
					<v-btn class="mx-2" fab dark small color="primary">
						<v-icon dark>
							mdi-twitter
						</v-icon>
					</v-btn>
				</div>
			</v-col>

		</v-row>


	</div>
</template>

	<script>
	import { doc, getDoc, } from "firebase/firestore";
	
	export default {
		data: () => ({
			dialog: false,
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
			countries: ['Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Anguilla', 'Antigua &amp; Barbuda', 'Argentina', 'Armenia', 'Aruba', 'Australia', 'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bermuda', 'Bhutan', 'Bolivia', 'Bosnia &amp; Herzegovina', 'Botswana', 'Brazil', 'British Virgin Islands', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cambodia', 'Cameroon', 'Cape Verde', 'Cayman Islands', 'Chad', 'Chile', 'China', 'Colombia', 'Congo', 'Cook Islands', 'Costa Rica', 'Cote D Ivoire', 'Croatia', 'Cruise Ship', 'Cuba', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Estonia', 'Ethiopia', 'Falkland Islands', 'Faroe Islands', 'Fiji', 'Finland', 'France', 'French Polynesia', 'French West Indies', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Gibraltar', 'Greece', 'Greenland', 'Grenada', 'Guam', 'Guatemala', 'Guernsey', 'Guinea', 'Guinea Bissau', 'Guyana', 'Haiti', 'Honduras', 'Hong Kong', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Isle of Man', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jersey', 'Jordan', 'Kazakhstan', 'Kenya', 'Kuwait', 'Kyrgyz Republic', 'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Macau', 'Macedonia', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Mauritania', 'Mauritius', 'Mexico', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Montserrat', 'Morocco', 'Mozambique', 'Namibia', 'Nepal', 'Netherlands', 'Netherlands Antilles', 'New Caledonia', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'Norway', 'Oman', 'Pakistan', 'Palestine', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal', 'Puerto Rico', 'Qatar', 'Reunion', 'Romania', 'Russia', 'Rwanda', 'Saint Pierre &amp; Miquelon', 'Samoa', 'San Marino', 'Satellite', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 'South Africa', 'South Korea', 'Spain', 'Sri Lanka', 'St Kitts &amp; Nevis', 'St Lucia', 'St Vincent', 'St. Lucia', 'Sudan', 'Suriname', 'Swaziland', 'Sweden', 'Switzerland', 'Syria', 'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', `Timor L'Este`, 'Togo', 'Tonga', 'Trinidad &amp; Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Turks &amp; Caicos', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'Uruguay', 'Uzbekistan', 'Venezuela', 'Vietnam', 'Virgin Islands (US)', 'Yemen', 'Zambia', 'Zimbabwe'],
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
				} else {
					console.log("No such document!");
				}
			},
			reset() {
				this.$refs.form.reset()
			},
			boton() {
				if (this.$refs.form.validate() == "") {
					this.$refs.form.validate()
				} else if (this.$store.state.cantidad == 0) {
					this.$refs.form.validate()
				} else if (this.$store.state.cantidad < 0) {
					this.$refs.form.validate()
				} else if (this.$store.state.cantidad > 50) {
					this.$refs.form.validate()
				} else if (this.$store.state.tallaSeleccionada == '') {
					this.$refs.talla.validate()
				}
			}
		}
	}
	</script>	