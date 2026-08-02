export class JobBoardConnector {
  async syncLinkedIn() {
    return { source: 'LinkedIn', synced: true };
  }

  async syncIndeed() {
    return { source: 'Indeed', synced: true };
  }

  async syncGlassdoor() {
    return { source: 'Glassdoor', synced: true };
  }
}
