  <template>
	<div>
		<v-form ref="form" v-model="valid" lazy-validation>
			<v-text-field outlined dense v-model="$store.state.nombre" :rules="nameRules" label="Name" required>
			</v-text-field>
			<v-text-field outlined dense v-model="$store.state.apellido" :rules="lastnameRules" label="Lastname"
				required>
			</v-text-field>

			<v-text-field outlined dense v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>

			<v-text-field outlined dense v-model="password" :rules="passwordRules" label="password" required>
			</v-text-field>

			<v-btn color="success" class="mr-4" @click="validate">
				registrase
			</v-btn>
		</v-form>
	</div>
</template>
<script>
import {  createUserWithEmailAndPassword } from "firebase/auth";

export default {
	data: () => ({
		valid: true,
		password: '',
		passwordRules: [
			v => !!v || 'password is required',
			v => (v && v.length >= 4) || 'password must be less than 4 characters',
		],
		email: '',
		emailRules: [
			v => !!v || 'E-mail is required',
			v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
		],
		// name: '',
		nameRules: [
			v => !!v || 'Name is required',
		],
		lastname: '',
		lastnameRules: [
			v => !!v || 'Name is required',
		]
	}),

	methods: {
		validate() {
			if (this.$refs.form.validate() == "") {
				this.$refs.form.validate()
			} else {
				const auth = this.$store.state.auth;
				createUserWithEmailAndPassword(auth, this.email, this.password)
					.then((userCredential) => {
						// this.$router.push('/')
						console.log(userCredential.user);
					})
					.catch((error) => {
						console.log(error);
					});
			}
		},
	},
}
</script>

<style>
</style>
