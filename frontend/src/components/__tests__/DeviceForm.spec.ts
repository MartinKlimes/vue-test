import { describe, it, expect } from "vitest";
import { mount } from '@vue/test-utils';

import DeviceForm from '../DeviceForm.vue';

describe('DeviceForm.vue', () => {
    it('renders the form with input fields and selects', async () => {
      const owners = ['Owner1', 'Owner2'];
      const wrapper = mount(DeviceForm, {
        props: {
          owners: owners,
        },
      });
  
      expect(wrapper.find('form').exists()).toBe(true);
  
      expect(wrapper.find('input[name="hostname"]').exists()).toBe(true);
      expect(wrapper.find('select[name="device_type"]').exists()).toBe(true);
      expect(wrapper.find('select[name="os_type"]').exists()).toBe(true);
  
      owners.forEach((owner) => {
        expect(wrapper.find(`select[name="existing-owner"] option[value="${owner}"]`).exists()).toBe(true);
      });

      expect(wrapper.find('input[name="new-owner"]').exists()).toBe(true);

      expect(wrapper.find('button[type="button"]').text()).toBe('Cancel');
      expect(wrapper.find('button[type="submit"]').text()).toBe('Create');
    });
  
    it('emits a close event when Cancel button is clicked', async () => {
      const wrapper = mount(DeviceForm, {
        props: {
          owners: [],
        },
      });
  
      await wrapper.find('button[type="button"]').trigger('click');
  
      expect(wrapper.emitted().close).toBeTruthy();
    });
  
    it('emits a submit event with form data when Create button is clicked', async () => {
      const owners = ['Owner1', 'Owner2', 'Owner3'];
      const wrapper = mount(DeviceForm, {
        props: {
          owners: owners,
        },
      });

    await wrapper.find('input[name="hostname"]').setValue('test-hostname');
    await wrapper.find('select[name="device_type"]').setValue('pc');
    await wrapper.find('select[name="os_type"]').setValue('win');
    await wrapper.find('select[name="existing-owner"]').setValue('Owner1');

      await wrapper.find('button[type="submit"]').trigger('click');
  
      expect(wrapper.emitted().submit).toBeTruthy();
      expect(wrapper.emitted().submit[0]).toEqual([
        {
          hostname: 'test-hostname',
          device_type: 'pc',
          os_type: 'win',
          owner_name: 'Owner1',
        },
      ]);
    });
  });