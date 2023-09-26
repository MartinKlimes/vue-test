import { describe, it, expect } from "vitest";
import { mount } from '@vue/test-utils';
import DeviceTable from '../DeviceTable.vue';


describe('DeviceTable.vue', () => {
  it('renders a table with provided items', () => {
    const items = [
      {
        hostname: 'test-hostname',
        device_type: 'pc',
        os_type: 'win',
        owner_name: 'user1',
      },
      {
        hostname: 'test-hostname2',
        device_type: 'laptop',
        os_type: 'iOS',
        owner_name: 'user2',
      },
    ];

    const wrapper = mount(DeviceTable, {
      props: {
        items: items,
      },
    });

    expect(wrapper.find('.device-table').exists()).toBe(true);

    const tableHeaders = wrapper.findAll('.table-head th');
    expect(tableHeaders.length).toBe(4);
    expect(tableHeaders[0].text()).toBe('Hostname');
    expect(tableHeaders[1].text()).toBe('Device type');
    expect(tableHeaders[2].text()).toBe('OS type');
    expect(tableHeaders[3].text()).toBe('Owner name');

    const tableRows = wrapper.findAll('.table-raw');
    expect(tableRows.length).toBe(items.length);


    expect(tableRows[0].text()).toContain('test-hostname');
    expect(tableRows[0].text()).toContain('pc');
    expect(tableRows[0].text()).toContain('win');
    expect(tableRows[0].text()).toContain('user1');

    expect(tableRows[1].text()).toContain('test-hostname2');
    expect(tableRows[1].text()).toContain('laptop');
    expect(tableRows[1].text()).toContain('iOS');
    expect(tableRows[1].text()).toContain('user2');
  });

  it('renders a message when no items are provided', () => {
    const wrapper = mount(DeviceTable, {
      props: {
        items: [],
      },
    });

    expect(wrapper.find('.no-devices').text()).toBe('No devices have been added yet.');
  });
});
