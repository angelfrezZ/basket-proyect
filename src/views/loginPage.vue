  <template>
	<div>
		<v-form ref="form" v-model="valid" lazy-validation>
			<v-text-field outlined dense v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>

			<v-text-field outlined dense v-model="password" :rules="passwordRules" label="password" required>
			</v-text-field>

			<v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">
				Iniciar Session
			</v-btn>

			<v-btn color="primary" class="mr-4" to="/register">
				Registrarse
			</v-btn>

		</v-form>
	</div>
</template>
<script>
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import firebase from "@/firebase";


export default {

	data: () => ({
		valid: true,
		password: '',
		passwordRules: [
			v => !!v || 'password is required',
			v => (v && v.length <= 10) || 'Name must be less than 10 characters',
		],
		email: '',
		emailRules: [
			v => !!v || 'E-mail is required',
			v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
		],
		select: null,
	}),

	methods: {
		validate() {
			if (this.$refs.form.validate() == "") {
				this.$refs.form.validate()
			} else {
				const auth = getAuth(firebase.app);
				signInWithEmailAndPassword (auth, this.email, this.password)
					.then((cred) => {
						location.assign("/")
						console.log(cred);
					})
					.catch((error) => {
						console.log(error);
					});
			}
		},
		reset() {
			this.$refs.form.reset()
		},
	},
}
</script>

<style>
</style>
