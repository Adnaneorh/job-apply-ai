export type ConnectorName = 'linkedin' | 'indeed' | 'glassdoor';

const catalog = {
  linkedin: [{ title: 'Frontend Engineer', location: 'Remote', company: 'LinkedIn Partner' }],
  indeed: [{ title: 'Backend Engineer', location: 'New York, NY', company: 'Indeed Partner' }],
  glassdoor: [{ title: 'Full Stack Engineer', location: 'Austin, TX', company: 'Glassdoor Partner' }]
};

export const connectorsService = {
  async fetch(name: ConnectorName) {
    return catalog[name] ?? [];
  }
};
