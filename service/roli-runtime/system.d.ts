import {Agent, Data, Event, Controller} from "./model-types";

/**
 * Saves one or more Data to the service.
 * - All changes made to Data must be saved or reverted by the end of the transaction. Otherwise, the controller call will fail with an Engine_UnsavedChanges error.
 * @see Data
 * @param {Data[]} data - One or more Data to save.
 * @returns {boolean} True if there were any changes to save, False otherwise.
 * */
export function saveData(...data: Data[]): boolean;

/**
 * Saves one or more Data and all the Data they reference (the entire tree) to their datastore's.
 * @param {Data[]} dataRoots - One or more Data, along with all the Data they reference, to save.
 * @returns {boolean} True if there were any changes to save, False otherwise.
 * */
export function saveDataGraphs(...dataRoots: Data[]): boolean;

/**
 * Undoes any changes made since the last time a Data or Controller was saved in the current transaction.
 * - Only changes made since the last saveData/saveDataGraphs call are reverted.
 * - Only undoes changes made as part of the save transaction, that is, the same controller call.
 * - If there hasn't been a saveData/saveDataGraphs call then all changes made since the beginning of the
 * transaction will be reverted. This is always the case for Controllers since they cannot be saved manually.
 * - This function does not revert any changes made to referenced Data/Controllers (I.e. It leaves the rest of the object graph alone).
 * @param {T} controllerOrData - The Controller or Data to revert.
 * */
export function revertObject<T extends Controller | Data>(controllerOrData: T): void;

/**
 * Create a new session with the Agent allowing you to call its methods.
 * @param agentType The class type that extends Agent.
 * @returns {T} The Agent instance.
 */
export function getAgent<T extends Agent>(agentType: new (...args: any[]) => T): T;

/**
 * Gets an existing Controller instance from the service or creates a new one if it does not exist.
 * @param {new(primaryKey: string) => T} controllerType - The class type that extends Controller. (E.g. MyController)
 * @param {string} primaryKey - The primary key used to uniquely identify the Controller instance.
 * @returns {T} The Controller instance.
 * */
export function getController<T extends Controller>(controllerType: new (primaryKey: string) => T, primaryKey: string): T;

/**
 * Gets an existing Data instance from the service.
 * - New Data instances are not created automatically with this call. You can create new Data instances just like you would any other JavaScript object: E.g. `let player = new Player("Scott")` where `Player` is a service class that extends the Data base class.
 * @param {new(...args: any[]) => T} dataType - The class type that extends Data. (E.g. `Player` that extends Data)
 * @param {string} primaryKey - A string that uniquely identifies the Data instance.
 * @returns {T} The Data instance.
 * */
export function getData<T extends Data>(dataType: new (...args: any[]) => T, primaryKey: string): T;

/**
 * Permanently deletes a Data or Controller instance from the service. Once it has been deleted it cannot be retrieved.
 * @param {T} controllerOrData - The Controller or Data to permanently delete.
 * @param {boolean} purge - (Optional, default = false) Normal deletion leaves behind a very small marker that prevents deleted controller and data instances from being re-created accidentally. Passing true to this argument prevents this marker from being written.
 * For controller deletions specifically, careful consideration should be made when setting this to true because it could result in accidental re-creation because controllers are created-on-first-use.
 * */
export function deleteObject<T extends Controller | Data>(controllerOrData: T, purge?: boolean): void;

/**
 * Fires a Event instance to all clients that are subscribed.
 * - Any Data or Controllers referred to by properties on the Event that have had changes during the current controller method call must be manually saved before calling fireEvent. Otherwise, an exception is thrown. This ensures a consistent state for client-side event subscribers.
 * - Events will not be fired when a controller call returns an error or an exception is unhandled by your code.
 * @see saveDataGraphs
 * @param {TS} source - A reference to a Controller or Data which will be used as the source of this event.
 * @param {TE} event - The Event object to send to all subscribed clients.
 * */
export function fireEvent<TS extends Controller | Data, TE extends Event>(source: TS, event: TE): void;

/**
 * Get a config value based on its key.
 * @param key The key
 */
export function getConfig(key: string): string;

/**
 * Make a POST call to a remote HTTPS endpoint
 */
export function postHttps(hostPortConfigKey: string, path: string, body: string, headers?: {}): Promise<string>;