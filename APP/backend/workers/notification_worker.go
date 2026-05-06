package workers

type NotificationWorker struct{}

func NewNotificationWorker() *NotificationWorker {
	return &NotificationWorker{}
}

func (w *NotificationWorker) Notify() {}
