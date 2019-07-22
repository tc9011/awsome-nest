import { NestFactory } from '@nestjs/core'

import { AppModule } from './app.module'
import { ValidationPipe } from './core/pipe/validation.pipe'
import { TransformInterceptor } from './core/interceptor/transform.interceptor'
import { ExceptionsFilter } from './core/filter/errors.filter'
import config from './config'
import { logger } from './core/middleware/logger.middleware'
import { Logger } from './shared/utils/logger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix('api/v1')

  app.use(logger)
  app.useGlobalFilters(new ExceptionsFilter())
  app.useGlobalInterceptors(new TransformInterceptor())
  app.useGlobalPipes(new ValidationPipe())

  await app.listen(config.port, config.hostName, () => {
    Logger.log(
      `Awesome-nest API server has been started on http://${config.hostName}:${config.port}`,
    )
  })
}

bootstrap()
