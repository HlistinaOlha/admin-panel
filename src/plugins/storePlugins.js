import { $api } from '@/services/service';

export default function(store) {
  try {
    store.$api = $api;
  } catch (e) {
    console.error(e);
  }
}
