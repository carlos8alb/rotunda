// For this solution I use a stack for limit_errors and save when the last notification was sent.
// First I check if the stack reaches 10 errors, then if the diff of time between the first
// and last item in the stack is less than 1 minute. If I have last_time_notification_sent,
// I check if the diff is more than 1 minute, otherwise the notification is sent.
// All the control is after save a new log error.

import fs from 'fs'

const LOGS_FILE_PATH = './error_alarm/logs_errors.txt'
const ERRORS_STACK_FILE_PATH = './error_alarm/errors_stack.txt'
const LAST_NOTIFICATION_FILE_PATH = './error_alarm/last_notification_time.txt'
const MAX_ERRORS_PER_MINUTE = 10
const NOTIFY_WINDOW_IN_SECONDS = 60
const currentTime = Date.now()
let response = 'No sent'

export function logError(errorMessage) {
  const errorDetail = `${currentTime} - ${errorMessage}\n`
  fs.appendFileSync(LOGS_FILE_PATH, errorDetail)
  fs.appendFileSync(ERRORS_STACK_FILE_PATH, `${currentTime}\n`)
  checkCountError(errorDetail)
  return response
}

function checkCountError(errorDetail) {
  const errorsStackFile = fs.readFileSync(ERRORS_STACK_FILE_PATH, 'utf-8')
  const errorsStackArray = errorsStackFile.split('\n')
  errorsStackArray.splice(-1)

  const firstTimeErrorStack = errorsStackArray[0]

  const lastTimeNotificationSent = fs.readFileSync(
    LAST_NOTIFICATION_FILE_PATH,
    'utf-8'
  )

  let timeToFullStack = 0
  let diffTimeLastNotification = 0

  if (errorsStackArray.length >= MAX_ERRORS_PER_MINUTE) {
    timeToFullStack = (currentTime - firstTimeErrorStack) / 1000
    if (timeToFullStack <= NOTIFY_WINDOW_IN_SECONDS) {
      if (lastTimeNotificationSent) {
        diffTimeLastNotification =
          (currentTime - lastTimeNotificationSent) / 1000
        if (diffTimeLastNotification >= NOTIFY_WINDOW_IN_SECONDS) {
          response = sendNotification(errorDetail)
        }
      } else {
        response = sendNotification(errorDetail)
      }
    }

    console.log(
      { timeToFullStack },
      { diffTimeLastNotification },
      { MAX_ERRORS_PER_MINUTE },
      { NOTIFY_WINDOW_IN_SECONDS }
    )
    fs.writeFileSync(ERRORS_STACK_FILE_PATH, '')
  }
}

function sendNotification(errorDetail) {
  fs.writeFileSync(LAST_NOTIFICATION_FILE_PATH, `${currentTime}`)
  console.log(`------------ Notification sent ---------------: ${errorDetail}`)
  return 'Sent'
}

console.log(logError('Error message'))
