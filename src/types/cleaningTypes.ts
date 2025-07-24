export interface Cleaning {
  id: string;
  client_id: string;
  property_id: number;
  cleaner_id: string;
  start_time: string;
  end_time: string;
  status: string;
  google_event_id: string;
  google_event_url: string;
  suites: number | null;
}
