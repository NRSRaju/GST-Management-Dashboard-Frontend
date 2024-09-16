import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function ReminderSidebar() {
  const [reminderDays, setReminderDays] = useState(7);

  const handleReminderSettingsSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://gst-system-backend-admin.onrender.com/api/settings', { reminderDays });
      toast.success('Reminder settings updated successfully');
    } catch (error) {
      console.error('Error updating reminder settings:', error);
      toast.error('Failed to update reminder settings. Please try again.');
    }
  };

  return (
    <div className="reminder-sidebar">
      <h2>Reminder Settings</h2>
      <form onSubmit={handleReminderSettingsSubmit}>
        <label>
          Send reminders
          <input
            type="number"
            value={reminderDays}
            onChange={(e) => setReminderDays(e.target.value)}
            min="1"
            max="30"
          />
          days before due date
        </label>
        <button type="submit">Save Settings</button>
      </form>
    </div>
  );
}

export default ReminderSidebar;