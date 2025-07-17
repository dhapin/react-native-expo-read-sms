/**
 * SMS permission status object
 */
export interface SMSPermissionStatus {
  /** Indicates if the RECEIVE_SMS permission is granted */
  hasReceiveSmsPermission: boolean;
  /** Indicates if the READ_SMS permission is granted */
  hasReadSmsPermission: boolean;
}

/**
 * SMS message object received from the native module
 */
export interface SMSMessage {
  /** The originating phone number/address */
  originatingAddress: string;
  /** The message body/content */
  body: string;
}

/**
 * Callback function type for SMS reading operations
 * @param status - Operation status: "success" or "error"
 * @param sms - SMS message object (only present on success)
 * @param error - Error message (only present on error)
 */
export type SMSCallback = (
  status: 'success' | 'error',
  sms: SMSMessage | string,
  error?: string
) => void;

/**
 * Default export - Native module instance
 */
declare const RNExpoReadSms: {
  startReadSMS: (
    success: (result: string) => void,
    error: (error: string) => void
  ) => void;
  stopReadSMS: () => void;
};

export default RNExpoReadSms;

/**
 * Starts reading SMS messages and calls the callback function when SMS is received
 * 
 * @param callback - Function to call when SMS is received or error occurs
 * @returns Promise<void>
 * 
 * @example
 * ```typescript
 * import { startReadSMS } from '@maniac-tech/react-native-expo-read-sms';
 * 
 * startReadSMS((status, sms, error) => {
 *   if (status === 'success') {
 *     console.log('SMS received:', sms);
 *   } else {
 *     console.error('Error:', error);
 *   }
 * });
 * ```
 */
export function startReadSMS(callback: SMSCallback): Promise<void>;

/**
 * Checks if the application has the necessary SMS permissions on Android
 * 
 * @returns Promise resolving to an object containing permission status
 * 
 * @example
 * ```typescript
 * import { checkIfHasSMSPermission } from '@maniac-tech/react-native-expo-read-sms';
 * 
 * const permissions = await checkIfHasSMSPermission();
 * console.log(permissions.hasReceiveSmsPermission); // true or false
 * console.log(permissions.hasReadSmsPermission); // true or false
 * ```
 */
export function checkIfHasSMSPermission(): Promise<SMSPermissionStatus>;

/**
 * Requests the necessary SMS permissions on Android
 * 
 * @returns Promise resolving to boolean indicating if permissions were granted
 * 
 * @example
 * ```typescript
 * import { requestReadSMSPermission } from '@maniac-tech/react-native-expo-read-sms';
 * 
 * const hasPermission = await requestReadSMSPermission();
 * if (hasPermission) {
 *   console.log("SMS permissions granted");
 * } else {
 *   console.log("SMS permissions denied");
 * }
 * ```
 */
export function requestReadSMSPermission(): Promise<boolean>;

/**
 * Stops reading SMS messages and unregisters the broadcast receiver
 * 
 * @example
 * ```typescript
 * import { stopReadSMS } from '@maniac-tech/react-native-expo-read-sms';
 * 
 * stopReadSMS();
 * ```
 */
export function stopReadSMS(): void;
