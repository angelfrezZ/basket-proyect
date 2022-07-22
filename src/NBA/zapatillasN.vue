<template>
	<div>
		<v-row>
			<v-col v-for="(item , i) in data" :key="i" cols="12" sm="4">
				<v-card  class="mt-5" max-width="274">
		
					<v-img height="200" :src="item.img"></v-img>
		
					<v-card-title>{{item.titulo}}</v-card-title>
		
					<v-card-text>
						<div>Small plates, salads & sandwiches - an intimate setting with 12 indoor seats plus patio seating.
						</div>
					</v-card-text>
					<v-card-text>
						<v-chip-group column>
							<v-chip color="warning">{{item.precio}}</v-chip>
						</v-chip-group>
					</v-card-text>
		
					<v-card-actions>
						<v-btn color="warning">
							Comprar
						</v-btn>
					</v-card-actions>
				</v-card>
			</v-col>
		</v-row>
	</div>
</template>

<script>
import { getDocs, collection, getFirestore } from "firebase/firestore";
import firebase from "@/firebase";

export default {
	data: () => ({
		data: []
	}),
	created() {
		this.initialize()
	},
	methods: {
		async initialize() {
			let categoria = 'categoria/zapatillas/mercancia'
			const db = getFirestore(firebase.app)
			const q = collection(db, categoria);
			const Snapshot = await getDocs(q);
			Snapshot.forEach((doc) => {
				let cliente = doc.data()
				cliente.id = doc.id;
				this.data.push(cliente)
			});
		}
	}
}
</script>	