<template>
	<form @submit.prevent="subirImg">
		<v-file-input @change="cargarImg($event)" accept="image/*" label="File input"></v-file-input>
		<button>subir imagen</button>
	</form>
</template>

<script>
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import firebase from '@/firebase';

export default {
	data: () => ({
		imagenes: [],
		file: null
	}),
	methods: {
		cargarImg(e) {
			this.file = e
			console.log(this.file);
		},
		subirImg() {
			const storage = getStorage(firebase.app);

			// Create the file metadata
			/** @type {any} */
			const metadata = {
				contentType: 'image/jpeg'
			};

			// Upload file and metadata to the object 'images/mountains.jpg'
			const storageRef = ref(storage, 'imagenes/' + this.file.name);
			const uploadTask = uploadBytesResumable(storageRef, this.file, metadata);

			// Listen for state changes, errors, and completion of the upload.
			uploadTask.on('state_changed',
				(snapshot) => {
					// Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
					const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
					console.log('Upload is ' + progress + '% done');
					switch (snapshot.state) {
						case 'paused':
							console.log('Upload is paused');
							break;
						case 'running':
							console.log('Upload is running');
							break;
					}
				},
				(error) => {
					// A full list of error codes is available at
					// https://firebase.google.com/docs/storage/web/handle-errors
					switch (error.code) {
						case 'storage/unauthorized':
							// User doesn't have permission to access the object
							break;
						case 'storage/canceled':
							// User canceled the upload
							break;

						// ...

						case 'storage/unknown':
							// Unknown error occurred, inspect error.serverResponse
							break;
					}
				},
				() => {
					// Upload completed successfully, now we can get the download URL
					getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
						console.log('File available at', downloadURL);
					});
				}
			);
		}
	}
}
</script>

<style>
</style>