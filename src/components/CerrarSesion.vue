<template>
	<div>
		<v-dialog v-model="dialog" width="500">
			<template v-slot:activator="{ on, attrs }">
				<v-list-item v-bind="attrs" v-on="on" class="red--text">
					<v-list-item-icon>
						<v-icon class="red--text">mdi-logout</v-icon>
					</v-list-item-icon>
					<v-list-item-title>Salir</v-list-item-title>
				</v-list-item>
			</template>

			<v-card>
				<v-card-title class="text-h5 grey lighten-5">
					<v-icon class="mr-4">mdi-logout</v-icon> Cerrar sesión
				</v-card-title>
				<br>
				<v-card-text> Estas seguro que deseas salir del sistema ? </v-card-text>

				<v-divider></v-divider>

				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn color="red" text @click="logout()">Aceptar</v-btn>
					<v-btn color="grey" text @click="dialog = false">Cancelar</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</div>
</template>


<script>
import { getAuth, signOut } from "firebase/auth";


export default {
	name: "CerrarSesion",
	data() {
		return {
			dialog: false,
			testing: "hola mundo",
		};
	},
	methods: {
		logout() {
			const auth = getAuth();
			signOut(auth)
				.then(() => {
					this.$router.push('/login')
				})
				.catch((error) => {
					console.log(error);
				});
		},
	},
};
</script>