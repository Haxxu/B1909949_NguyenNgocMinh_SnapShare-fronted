import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { toast } from 'vue3-toastify';

import { storage } from '@/config/firebase';
import { generateRandomString } from '@/utils/string';

class StorageService {
    async uploadFile(file) {
        let returnUrl = '';

        const fileName =
            new Date().getTime() + file.name + generateRandomString(20);
        const storageRef = ref(storage, `/images/${fileName}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        const snap = await uploadTask;

        let downloadUrl = await getDownloadURL(snap.ref);

        // uploadTask.on(
        //     'state_changed',
        //     (snapshot) => {},
        //     (error) => {
        //         console.log(error);
        //         toast.error('An error occured while uploading!');
        //     },
        //     () => {
        //         getDownloadURL(uploadTask.snapshot.ref).then((url) => {
        //             returnUrl = url;
        //         });
        //     }
        // );

        // let returnUrl = await getDownloadURL(uploadTask.snapshot.ref);

        // return returnUrl;
        return downloadUrl;
    }
}

export default new StorageService();
