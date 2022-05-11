import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  RemoveEvent,
  TransactionCommitEvent,
  TransactionRollbackEvent,
  TransactionStartEvent,
  UpdateEvent,
} from 'typeorm';

@EventSubscriber()
export class FileUploadSubscriber implements EntitySubscriberInterface {
  afterInsert(event: InsertEvent<any>) {
    // console.log(`AFTER ENTITY INSERTED: `, event.entity);
  }
}
