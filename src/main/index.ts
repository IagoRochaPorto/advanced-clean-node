import './config/module-alias'
import { env, app } from '@/main/config'

import 'reflect-metadata'

app.listen(env.port, () => console.log(`Server running at http://localhost:${env.port}`))
