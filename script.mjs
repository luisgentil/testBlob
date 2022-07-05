/**
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {
  directoryOpen,
  fileSave
} from 'https://unpkg.com/browser-fs-access';


(async () => {
  const saveButton = document.querySelector('#save');
   const pre = document.querySelector('pre');



  saveButton.addEventListener('click', async () => {
    const blob = new Blob(["<html><p>Hola Blob </p></html>"], {type: 'text/html'});  // await imageToBlob(document.querySelector('img'));
    try {
      await fileSave(blob, {
        fileName: 'helloW.html',
        extensions: ['.html'],
      });
    } catch (err) {
      if (err.name !== 'AbortError') {
        return console.error(err);
      }
      console.log('The user aborted a request.');
    }
  });


  saveButton.disabled = false;
})();
