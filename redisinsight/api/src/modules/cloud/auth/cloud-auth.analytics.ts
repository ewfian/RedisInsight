import { HttpException, Injectable } from '@nestjs/common';
import { TelemetryBaseService } from 'src/modules/analytics/telemetry.base.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { TelemetryEvents } from 'src/constants';
import { CloudSsoFeatureStrategy } from 'src/modules/cloud/cloud-sso.feature.flag';

@Injectable()
export class CloudAuthAnalytics extends TelemetryBaseService {
  constructor(protected eventEmitter: EventEmitter2) {
    super(eventEmitter);
  }

  sendCloudSignInSucceeded(flow: CloudSsoFeatureStrategy) {
    this.sendEvent(TelemetryEvents.CloudSignInSucceeded, { flow });
  }

  sendCloudSignInFailed(exception: HttpException, flow?: CloudSsoFeatureStrategy) {
    this.sendFailedEvent(TelemetryEvents.CloudSignInFailed, exception, { flow });
  }
}
