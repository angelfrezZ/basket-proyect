<template>
	<div>
		<v-row>
			<v-col v-for="(item, i) in data" :key="i" cols="12" sm="4">
				<v-card class="mt-5" max-width="274">

					<v-img style="width: 100%; max-width: 250px;" class="text-center"  :src="item.img"></v-img>

					<v-card-title>{{ item.nombre }}</v-card-title>

					<v-card-text>
						<div>Small plates, salads & sandwiches - an intimate setting with 12 indoor seats plus patio
							seating.
						</div>
					</v-card-text>
					<v-card-text>
						<v-chip-group column>
							<v-chip color="warning">US {{ item.precio | toCurrency }}</v-chip>
						</v-chip-group>
					</v-card-text>

					<v-card-actions>
						<v-btn color="warning" :to="`/camisetas/${item.id}`">
							Comprar
						</v-btn>
					</v-card-actions>
				</v-card>
			</v-col>
		</v-row>
	</div>
</template>

<script>
import { getDocs, collection } from "firebase/firestore";

export default {
	data: () => ({
		data: []
	}),
	created() {
		this.initialize()
		console.log(this.data);
	},
	methods: {
		async initialize() {
			let categoria = 'categoria/camisetas/mercancia'
			const q = collection(this.$store.state.db, categoria);
			const Snapshot = await getDocs(q);
			Snapshot.forEach((doc) => {
				let data = doc.data()
				data.id = doc.id
				this.data.push(data)
			});
		}
	}
}
</script>	