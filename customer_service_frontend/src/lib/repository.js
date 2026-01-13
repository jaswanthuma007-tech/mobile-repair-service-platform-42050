/**
 * Data repository for the Customer app.
 * Uses Supabase if configured, otherwise falls back to localStorage.
 *
 * Tables expected (if Supabase is used):
 * - repair_requests: id (uuid), created_at, customer_name, phone, device_type, issue, address, preferred_time, status
 *
 * Notes:
 * - This file intentionally keeps a small surface area to make it easy to replace with real APIs later.
 */
import { supabase, isSupabaseConfigured } from "./supabaseClient";

const LS_KEY = "mrsp_customer_repair_requests_v1";

function readLocal() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeLocal(items) {
  localStorage.setItem(LS_KEY, JSON.stringify(items));
}

function makeId() {
  return `local_${Math.random().toString(16).slice(2)}_${Date.now()}`;
}

// PUBLIC_INTERFACE
export async function createRepairRequest(payload) {
  /** Create a repair request. Returns the created request. */
  const request = {
    id: makeId(),
    created_at: new Date().toISOString(),
    status: "Requested",
    ...payload,
  };

  if (!isSupabaseConfigured) {
    const items = readLocal();
    items.unshift(request);
    writeLocal(items);
    return request;
  }

  const { data, error } = await supabase
    .from("repair_requests")
    .insert([
      {
        customer_name: payload.customer_name,
        phone: payload.phone,
        device_type: payload.device_type,
        issue: payload.issue,
        address: payload.address,
        preferred_time: payload.preferred_time,
        status: "Requested",
      },
    ])
    .select("*")
    .single();

  if (error) {
    // Fallback to local if Supabase fails (preview resiliency)
    const items = readLocal();
    items.unshift(request);
    writeLocal(items);
    return request;
  }

  return data;
}

// PUBLIC_INTERFACE
export async function listRepairRequests() {
  /** List repair requests ordered by most recent. */
  if (!isSupabaseConfigured) {
    return readLocal();
  }

  const { data, error } = await supabase
    .from("repair_requests")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return readLocal();
  }
  return data ?? [];
}

// PUBLIC_INTERFACE
export async function getRepairRequestById(id) {
  /** Fetch a single request by id. */
  if (!isSupabaseConfigured) {
    return readLocal().find((r) => r.id === id) ?? null;
  }

  const { data, error } = await supabase
    .from("repair_requests")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    return readLocal().find((r) => r.id === id) ?? null;
  }
  return data;
}

// PUBLIC_INTERFACE
export async function updateRepairRequestStatus(id, status) {
  /** Update status for a request; primarily used by service center app, kept here for completeness. */
  if (!isSupabaseConfigured) {
    const items = readLocal();
    const idx = items.findIndex((r) => r.id === id);
    if (idx >= 0) {
      items[idx] = { ...items[idx], status };
      writeLocal(items);
      return items[idx];
    }
    return null;
  }

  const { data, error } = await supabase
    .from("repair_requests")
    .update({ status })
    .eq("id", id)
    .select("*")
    .single();

  if (error) return null;
  return data;
}
