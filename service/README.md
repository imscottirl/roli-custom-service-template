# Welcome to Roli!
This directory contains your Roli backend service source code.
You can add any kind of file here but only .js, .mjs, and .ts files may contain service source code.

Login to Roli:
`$ roli login`

After making code changes, make them live with:
`$ cd service`
`$ roli deploy .`

Once your backend changes are deployed, generate code to connect to the latest version of your backend: 
`$ cd <npm project>`
`$ roli connect . my-service`
