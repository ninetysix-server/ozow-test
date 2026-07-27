import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

    const SUPABASE_URL = "https://pebkryplphawjlmvcfma.supabase.co";
    const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBlYmtyeXBscGhhd2psbXZjZm1hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE2ODg2NjEsImV4cCI6MjA5NzI2NDY2MX0.Sn1IPlLKhJG5u6gTXpB_tUbSr4PThWrWVpHUNDG1zdU";

    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    let allOrders = [];
    let activeOrder = null;

    const $ = id => document.getElementById(id);
    const money = value => new Intl.NumberFormat("en-ZA",{style:"currency",currency:"ZAR"}).format(Number(value || 0));
    const dateText = value => value ? new Date(value).toLocaleString("en-ZA",{dateStyle:"medium",timeStyle:"short"}) : "—";
    const safe = value => String(value ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]));
    const slug = value => String(value || "").toLowerCase().replace(/\s+/g,"-");

    function showToast(message){
      $("toast").textContent = message;
      $("toast").classList.add("show");
      setTimeout(()=>$("toast").classList.remove("show"),2400);
    }

    async function sendOrderUpdateEmail(
  orderRecordId,
  previousDesignStatus
){
  const { data, error } = await supabase.functions.invoke(
    "send-order-update-email",
    {
      body:{
        orderRecordId,
        previousDesignStatus
      }
    }
  );

  if(error){
    throw error;
  }

  if(!data?.success){
    throw new Error(
      data?.error || "Unable to send customer email"
    );
  }

  return data;
}

    async function guardAdmin(){
      const { data:{ session } } = await supabase.auth.getSession();
      if(!session){
        window.location.href = "index.html";
        return null;
      }
      $("adminEmail").textContent = session.user.email || "Administrator";

      const { data, error } = await supabase
        .from("admins")
        .select("user_id")
        .eq("user_id", session.user.id)
        .maybeSingle();

      if(error || !data){
        document.body.innerHTML = `<div class="error"><h2>Access denied</h2><p>This account is not registered as a 96 Studios administrator.</p><a href="index.html">Return home</a></div>`;
        return null;
      }
      return session.user;
    }

    async function loadOrders(){
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .order("created_at",{ascending:false});

      if(error){
        $("tableState").className = "error";
        $("tableState").textContent = error.message;
        return;
      }
      allOrders = data || [];
      updateStats();
      renderOrders();
    }

    function updateStats(){
      const paid = allOrders.filter(o => (o.payment_status || "").toLowerCase() === "paid");
      const designing = allOrders.filter(o => ["designing","review","ready"].includes((o.design_status || "").toLowerCase()));
      const revenue = paid.reduce((sum,o)=>sum + Number(o.totals?.total || 0),0);
      $("totalOrders").textContent = allOrders.length;
      $("paidOrders").textContent = paid.length;
      $("designingOrders").textContent = designing.length;
      $("paidRevenue").textContent = money(revenue);
    }

    function serviceNames(order){
      return (order.cart || []).map(i=>i.serviceTitle || i.title || i.serviceId || "Design Service").join(", ");
    }

    function filteredOrders(){
      const query = $("searchInput").value.trim().toLowerCase();
      const payment = $("paymentFilter").value.toLowerCase();
      const design = $("designFilter").value.toLowerCase();

      return allOrders.filter(order=>{
        const haystack = [order.order_id,order.client_id,serviceNames(order)].join(" ").toLowerCase();
        return (!query || haystack.includes(query))
          && (!payment || (order.payment_status || "").toLowerCase() === payment)
          && (!design || (order.design_status || "").toLowerCase() === design);
      });
    }

    function renderOrders(){
      const orders = filteredOrders();
      $("tableState").hidden = orders.length > 0;
      $("tableWrap").hidden = orders.length === 0;
      if(!orders.length){
        $("tableState").className = "empty";
        $("tableState").textContent = allOrders.length ? "No orders match your filters." : "No orders yet.";
        return;
      }

      $("ordersBody").innerHTML = orders.map(order=>{
        const payment = order.payment_status || "Pending";
        const design = order.design_status || "Waiting";
        return `<tr>
          <td><span class="order-id">${safe(order.order_id)}</span></td>
          <td>${safe(order.client_id || "—")}</td>
          <td>${safe(serviceNames(order) || "—")}</td>
          <td>${money(order.totals?.total)}</td>
          <td><span class="badge badge-${slug(payment)}">${safe(payment)}</span></td>
          <td><span class="badge badge-${slug(design)}">${safe(design)}</span></td>
          <td>${Number(order.progress || 0)}%</td>
          <td>${safe(dateText(order.created_at))}</td>
          <td><div class="actions"><button class="icon-btn" data-open="${safe(order.id)}" title="Open order"><i class="fa-solid fa-eye"></i></button></div></td>
        </tr>`;
      }).join("");

      document.querySelectorAll("[data-open]").forEach(btn=>btn.addEventListener("click",()=>openOrder(btn.dataset.open)));
    }

    function openOrder(id){
      activeOrder = allOrders.find(o=>o.id===id);
      if(!activeOrder) return;
      $("modalTitle").textContent = activeOrder.order_id;
      const items = (activeOrder.cart || []).map(item=>`
        <div class="item-row">
          <span>${safe(item.serviceTitle || "Design Service")} · ${safe(item.tierName || "Standard")} × ${Number(item.quantity || 1)}</span>
          <strong>${money(Number(item.price || 0) * Number(item.quantity || 1))}</strong>
        </div>`).join("") || "No cart items";

      $("modalBody").innerHTML = `
        <div class="detail-grid">
          <div class="detail-card"><small>Client ID</small><strong>${safe(activeOrder.client_id || "—")}</strong></div>
          <div class="detail-card"><small>Created</small><strong>${safe(dateText(activeOrder.created_at))}</strong></div>
          <div class="detail-card"><small>Payment Status</small><strong>${safe(activeOrder.payment_status || "Pending")}</strong></div>
          <div class="detail-card"><small>Total</small><strong>${money(activeOrder.totals?.total)}</strong></div>
          <div class="detail-card full"><small>Items</small><div class="items">${items}</div></div>
          <div class="detail-card full"><small>Design Description</small><strong>${safe(activeOrder.user_input?.designDescription || "No description provided")}</strong></div>

<div class="detail-card full" id="adminApprovalCard">
  <small>Customer approval</small>
  <div id="adminApprovalResult" class="meta-note">
    Loading customer response...
  </div>
</div>

<div class="detail-card"><small>Preferred Colours</small><strong>${safe(activeOrder.user_input?.preferredColors || "Not provided")}</strong></div>
<div class="detail-card"><small>Reference</small><strong>${activeOrder.user_input?.sketchImageUrl ? `<a target="_blank" rel="noopener" href="${safe(activeOrder.user_input.sketchImageUrl)}">Open image</a>` : "Not provided"}</strong></div>
        </div>
        <div class="management-grid">
          <div class="field">
            <label>Assigned designer</label>
            <input id="editDesigner" maxlength="120" placeholder="Designer name" value="${safe(activeOrder.assigned_designer || "")}">
          </div>
          <div class="field">
            <label>Estimated completion date</label>
            <input id="editDueDate" type="date" value="${safe(activeOrder.estimated_completion_date || "")}">
          </div>
          <div class="field full">
            <label>Internal admin notes</label>
            <textarea id="editAdminNotes" maxlength="3000" placeholder="Private notes—customers cannot see these">${safe(activeOrder.admin_notes || "")}</textarea>
            <div class="meta-note">Internal notes are visible only in the admin dashboard.</div>
          </div>
          <div class="field full">
            <label>Customer update</label>
            <textarea id="editCustomerUpdate" maxlength="1000" placeholder="A short progress message the customer can see">${safe(activeOrder.customer_update || "")}</textarea>
          </div>
        </div>
        <div class="delivery-manager">
          <h3>Customer file delivery</h3>
          <div class="upload-row">
            <div class="field">
              <label>Select completed files</label>
              <input id="deliveryFiles" type="file" multiple accept=".pdf,.png,.jpg,.jpeg,.zip,.svg,.webp,.ai,.eps">
              <label style="margin-top:10px;display:block;">File label</label>
              <select id="deliveryLabel">
                <option value="Concept">Concept</option>
                <option value="Revision">Revision</option>
                <option value="Final Files">Final Files</option>
              </select>
              <div class="meta-note">Choose how this file should appear in the customer gallery.</div>
              <div class="meta-note">PDF, images, ZIP, SVG, AI and EPS files are supported.</div>
            </div>
            <button type="button" class="upload-btn" id="uploadFiles"><i class="fa-solid fa-cloud-arrow-up"></i> Upload</button>
          </div>
          <div class="file-list" id="adminFileList"><div class="meta-note">Loading delivery files...</div></div>
        </div>
        <div class="status-editor">
          <div class="field"><label>Payment status</label>
            <select id="editPayment"><option>Pending</option><option>Paid</option><option>Failed</option><option>Cancelled</option></select>
          </div>
          <div class="field"><label>Design status</label>
            <select id="editDesign"><option>Waiting</option><option>Designing</option><option>Review</option><option>Ready</option><option>Completed</option></select>
          </div>
          <div class="field"><label>Progress</label>
            <select id="editProgress"><option value="0">0%</option><option value="25">25%</option><option value="50">50%</option><option value="75">75%</option><option value="100">100%</option></select>
            <div class="quick-progress">
              <button type="button" class="progress-chip" data-progress="0">0%</button>
              <button type="button" class="progress-chip" data-progress="25">25%</button>
              <button type="button" class="progress-chip" data-progress="50">50%</button>
              <button type="button" class="progress-chip" data-progress="75">75%</button>
              <button type="button" class="progress-chip" data-progress="100">100%</button>
            </div>
          </div>
          <button class="save-btn" id="saveOrder"><i class="fa-solid fa-floppy-disk"></i> Save Changes</button>
        </div>`;

      $("editPayment").value = activeOrder.payment_status || "Pending";
      $("editDesign").value = activeOrder.design_status || "Waiting";
      $("editProgress").value = String(activeOrder.progress || 0);
      document.querySelectorAll(".progress-chip").forEach(chip=>{
        chip.addEventListener("click",()=>{$("editProgress").value = chip.dataset.progress;});
      });
      $("saveOrder").addEventListener("click",saveOrderChanges);
      $("uploadFiles").addEventListener("click", uploadDeliveryFiles);
      loadAdminApproval();
      loadAdminDeliveryFiles();
      $("orderModal").style.display = "flex";
      document.body.style.overflow = "hidden";
    }

  
function getFileIcon(mimeType, fileName) {

    const name = (fileName || "").toLowerCase();

    if (mimeType?.startsWith("image/")) {
        return '<i class="fa-solid fa-image"></i>';
    }

    if (name.endsWith(".pdf")) {
        return '<i class="fa-solid fa-file-pdf"></i>';
    }

    if (
        name.endsWith(".zip") ||
        name.endsWith(".rar") ||
        name.endsWith(".7z")
    ) {
        return '<i class="fa-solid fa-file-zipper"></i>';
    }

    if (
        name.endsWith(".ai") ||
        name.endsWith(".eps") ||
        name.endsWith(".svg")
    ) {
        return '<i class="fa-solid fa-pen-ruler"></i>';
    }

    return '<i class="fa-solid fa-file"></i>';
}

async function loadAdminApproval(){
  if(!activeOrder) return;

  const result = $("adminApprovalResult");

  const { data, error } = await supabase
    .from("order_approvals")
    .select("*")
    .eq("order_id", activeOrder.id)
    .order("created_at", { ascending:false })
    .limit(1)
    .maybeSingle();

  if(error){
    console.error("Admin approval load failed:", error);
    result.innerHTML = `
      <span style="color:var(--danger);">
        Unable to load customer approval.
      </span>
    `;
    return;
  }

  if(!data){
    result.innerHTML = `
      <span style="color:var(--muted);">
        The customer has not responded yet.
      </span>
    `;
    return;
  }

  if(data.decision === "approved"){
    result.innerHTML = `
      <strong style="display:block;color:var(--green);margin-bottom:6px;">
        <i class="fa-solid fa-circle-check"></i>
        Design approved
      </strong>

      <span>
        Submitted ${safe(dateText(data.created_at))}
      </span>
    `;
    return;
  }

  result.innerHTML = `
    <strong style="display:block;color:var(--danger);margin-bottom:6px;">
      <i class="fa-solid fa-rotate-left"></i>
      Changes requested
    </strong>

    <div style="margin-bottom:8px;white-space:pre-wrap;">
      ${safe(data.feedback || "No feedback was provided.")}
    </div>

    <small>
      Submitted ${safe(dateText(data.created_at))}
    </small>
  `;
}

    async function loadAdminDeliveryFiles(){
      if(!activeOrder) return;
      const list = $("adminFileList");
      list.innerHTML = '<div class="meta-note">Loading delivery files...</div>';

      const { data, error } = await supabase
        .from("order_files")
        .select("*")
        .eq("order_id", activeOrder.id)
        .order("created_at", { ascending:false });

      if(error){
        list.innerHTML = `<div class="meta-note">${safe(error.message)}</div>`;
        return;
      }
      if(!data?.length){
        list.innerHTML = '<div class="meta-note">No completed files uploaded yet.</div>';
        return;
      }

      list.innerHTML = data.map(file => `
        <div class="file-entry" style="display:flex;align-items:center;gap:15px;">
          ${file.mime_type?.startsWith("image/")
? `
<div style="
    width:50px;
    height:50px;
    border-radius:12px;
    overflow:hidden;
    background:#edf5fb;
">
    <img
        src="#"
        data-thumbnail="${safe(file.id)}"
        style="
            width:100%;
            height:100%;
            object-fit:cover;
        ">
    </div>
    `
    : `
    <div style="
        width:50px;
        height:50px;
        border-radius:12px;
        background:#edf5fb;
        display:flex;
        align-items:center;
        justify-content:center;
        color:#004370;
        font-size:22px;
    ">
        ${getFileIcon(file.mime_type, file.file_name)}
    </div>
    `}
          <div>
            <strong title="${safe(file.file_name)}">${safe(file.file_name)}</strong>
            <small>${formatFileSize(file.size_bytes)} · ${safe(dateText(file.created_at))}</small>
          </div>
          <div class="file-actions">
            <button type="button" class="file-action" data-admin-download="${safe(file.id)}"><i class="fa-solid fa-download"></i></button>
            <button type="button" class="file-action delete" data-admin-delete="${safe(file.id)}"><i class="fa-solid fa-trash"></i></button>
          </div>
        </div>`).join("");

        for (const file of data) {

    if (!file.mime_type?.startsWith("image/")) continue;

    const { data: signed } = await supabase.storage
        .from("design-files")
        .createSignedUrl(file.storage_path, 120);

    if (!signed) continue;

    const img = document.querySelector(
        `[data-thumbnail="${file.id}"]`
    );

    if (img) {
        img.src = signed.signedUrl;
    }
}

      document.querySelectorAll("[data-admin-download]").forEach(btn=>{
        btn.addEventListener("click",()=>downloadAdminFile(btn.dataset.adminDownload, data));
      });
      document.querySelectorAll("[data-admin-delete]").forEach(btn=>{
        btn.addEventListener("click",()=>deleteDeliveryFile(btn.dataset.adminDelete, data));
      });
    }

    function formatFileSize(bytes){
      const value = Number(bytes || 0);
      if(value < 1024) return `${value} B`;
      if(value < 1024 * 1024) return `${(value / 1024).toFixed(1)} KB`;
      return `${(value / (1024 * 1024)).toFixed(1)} MB`;
    }

    async function uploadDeliveryFiles(){
      if(!activeOrder) return;
      const input = $("deliveryFiles");
      const files = Array.from(input.files || []);
      const label = $("deliveryLabel").value;
      if(!files.length){
        showToast("Choose at least one file");
        return;
      }

      const button = $("uploadFiles");
      button.disabled = true;
      button.textContent = "Uploading...";

      try{
        const previousDesignStatus =
        activeOrder.design_status || "Waiting";

        for(const file of files){
          const cleanName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
          const storagePath = `${activeOrder.user_id}/${activeOrder.order_id}/${crypto.randomUUID()}-${cleanName}`;

          const { error: uploadError } = await supabase.storage
            .from("design-files")
            .upload(storagePath, file, {
              cacheControl:"3600",
              upsert:false,
              contentType:file.type || undefined
            });
          if(uploadError) throw uploadError;

          const { error: rowError } = await supabase.from("order_files").insert({
            order_id:activeOrder.id,
            user_id:activeOrder.user_id,
            storage_path:storagePath,
            file_name:file.name,
            mime_type:file.type || null,
            size_bytes:file.size,
            label
          });

          if(rowError){
            await supabase.storage.from("design-files").remove([storagePath]);
            throw rowError;
          }
        }

        input.value = "";
        const { error: readyUpdateError } = await supabase
  .from("orders")
  .update({
    design_status:"Ready",
    progress:100,
    customer_update:
      "Your completed design files are ready for download.",
    updated_at:new Date().toISOString()
  })
  .eq("id",activeOrder.id);

if(readyUpdateError){
  throw readyUpdateError;
}

let uploadActivityCreated = false;

try {
  showToast("Creating upload timeline...");
  console.log("CREATING FILE UPLOAD ACTIVITY", {
    orderId: activeOrder.id,
    userId: activeOrder.user_id,
    orderNumber: activeOrder.order_id
  });

  await createOrderActivity({
    orderId: activeOrder.id,
    activityType: "files_uploaded",
    title: "Design files uploaded",
    description:
      "Your completed design files are now available for download.",
    designStatus: "Ready",
    visibleToCustomer: true
  });

  uploadActivityCreated = true;

  console.log("FILE UPLOAD ACTIVITY CREATED");
} catch(activityError) {
  console.error(
    "FILE UPLOAD ACTIVITY FAILED:",
    activityError
  );

  throw new Error(
    `Files uploaded, but timeline failed: ${
      activityError.message || "Unknown timeline error"
    }`
  );
}

let readyEmailSent = false;

if(
  previousDesignStatus.toLowerCase() !== "ready"
){
  try{
    const emailResult = await sendOrderUpdateEmail(
      activeOrder.id,
      previousDesignStatus
    );

    readyEmailSent =
      emailResult.emailSent === true;
  }catch(emailError){
    console.error(
      "Files uploaded, but ready email failed:",
      emailError
    );
  }
}

        activeOrder.design_status = "Ready";
        activeOrder.progress = 100;
        activeOrder.customer_update = "Your completed design files are ready for download.";
        $("editDesign").value = "Ready";
        $("editProgress").value = "100";
        $("editCustomerUpdate").value = activeOrder.customer_update;

        await loadAdminDeliveryFiles();
        updateStats();
        renderOrders();
        if(uploadActivityCreated && readyEmailSent){
  showToast(
    "Files uploaded, timeline created and customer emailed"
  );
} else if(uploadActivityCreated){
  showToast(
    "Files uploaded and timeline created"
  );
} else if(readyEmailSent){
  showToast(
    "Files uploaded and customer emailed"
  );
} else {
  showToast("Files uploaded successfully");
}
      }catch(error){
        showToast(error.message || "File upload failed");
      }finally{
        button.disabled = false;
        button.innerHTML = '<i class="fa-solid fa-cloud-arrow-up"></i> Upload';
      }
    }

    async function downloadAdminFile(fileId, files){
    const file = files.find(item => item.id === fileId);
    if(!file) return;

    const { data, error } = await supabase.storage
        .from("design-files")
        .createSignedUrl(file.storage_path, 120);

    if(error){
        showToast(error.message);
        return;
    }

    const canPreview =
        file.mime_type?.startsWith("image/") ||
        file.mime_type === "application/pdf" ||
        file.file_name?.toLowerCase().endsWith(".pdf");

    if(canPreview){
        $("filePreviewTitle").textContent =
            file.label || file.file_name;

        $("filePreviewFrame").src = data.signedUrl;
        $("filePreviewModal").style.display = "flex";
        document.body.style.overflow = "hidden";
        return;
    }

    window.open(data.signedUrl, "_blank", "noopener");
}

    async function deleteDeliveryFile(fileId, files){
      const file = files.find(item=>item.id===fileId);
      if(!file) return;
      if(!confirm(`Remove ${file.file_name}?`)) return;

      const { error: storageError } = await supabase.storage
        .from("design-files")
        .remove([file.storage_path]);
      if(storageError){ showToast(storageError.message); return; }

      const { error } = await supabase.from("order_files").delete().eq("id",file.id);
      if(error){ showToast(error.message); return; }
      await loadAdminDeliveryFiles();
      showToast("File removed");
    }

    async function createOrderActivity({
    orderId,
    activityType,
    title,
    description,
    designStatus,
    visibleToCustomer = true
}) {
    const {
        data: { user },
        error: userError
    } = await supabase.auth.getUser();

    if (userError || !user) {
        console.error("Could not identify admin:", userError);
        throw new Error("Admin authentication could not be verified.");
    }

    const { error } = await supabase
        .from("order_activity")
        .insert({
            order_id: orderId,
            activity_type: activityType,
            title,
            description,
            design_status: designStatus,
            visible_to_customer: visibleToCustomer,
            created_by: user.id
        });

    if (error) {
        console.error("Order activity insert failed:", error);
        throw error;
    }

    console.log("Order activity created:", title);
}

   async function saveOrderChanges(){
  if(!activeOrder) return;

  const button = $("saveOrder");
  button.disabled = true;
  button.textContent = "Saving...";

  const previousDesignStatus =
    activeOrder.design_status || "Waiting";

  const updates = {
    payment_status: $("editPayment").value,
    design_status: $("editDesign").value,
    progress: Number($("editProgress").value),

    assigned_designer:
      $("editDesigner").value.trim() || null,

    estimated_completion_date:
      $("editDueDate").value || null,

    admin_notes:
      $("editAdminNotes").value.trim() || null,

    customer_update:
      $("editCustomerUpdate").value.trim() || null,

    updated_at: new Date().toISOString()
  };

  const designStatusChanged =
    previousDesignStatus.toLowerCase() !==
    updates.design_status.toLowerCase();

  try {
    const { error: updateError } = await supabase
      .from("orders")
      .update(updates)
      .eq("id", activeOrder.id);

    if(updateError){
      throw updateError;
    }

    let activityCreated = false;
    let activityFailed = false;
    let emailSent = false;
    let emailFailed = false;

    // Create timeline activity before closing the modal
    if(designStatusChanged){
      button.textContent = "Creating timeline...";

      const newStatus = updates.design_status;
      const normalizedStatus = newStatus.toLowerCase();

      const activityDetails = {
        waiting: {
          title: "Order added to the waiting list",
          description:
            "Your order is currently waiting to be assigned and started."
        },

        designing: {
          title: "Design work has started",
          description:
            "Your designer is now working on your project."
        },

        review: {
          title: "Design under review",
          description:
            "Your design is currently being reviewed before delivery."
        },

        ready: {
          title: "Design files ready",
          description:
            "Your completed design files are ready for download."
        },

        completed: {
          title: "Order completed",
          description:
            "Your design order has been marked as completed."
        }
      };

      const details =
        activityDetails[normalizedStatus] || {
          title: `Order moved to ${newStatus}`,
          description:
            updates.customer_update ||
            `Your order status has changed to ${newStatus}.`
        };

      try {
        await createOrderActivity({
          orderId: activeOrder.id,
          activityType: "status_change",
          title: details.title,
          description:
            updates.customer_update?.trim() ||
            details.description,
          designStatus: newStatus,
          visibleToCustomer: true
        });

        activityCreated = true;
      } catch(activityError) {
        activityFailed = true;

        console.error(
          "Order saved, but timeline activity failed:",
          activityError
        );
      }
    }

    // Send status email
    if(designStatusChanged){
      button.textContent = "Sending email...";

      try {
        const result = await sendOrderUpdateEmail(
          activeOrder.id,
          previousDesignStatus
        );

        emailSent = result.emailSent === true;
      } catch(emailError) {
        emailFailed = true;

        console.error(
          "Order saved, but customer email failed:",
          emailError
        );
      }
    }

    Object.assign(activeOrder, updates);

    button.disabled = false;
    button.innerHTML =
      '<i class="fa-solid fa-floppy-disk"></i> Save Changes';

    closeModal();
    updateStats();
    renderOrders();

    if(activityFailed && emailFailed){
      showToast(
        "Order saved, but timeline and email failed"
      );
    } else if(activityFailed){
      showToast(
        emailSent
          ? "Customer emailed, but timeline failed"
          : "Order saved, but timeline failed"
      );
    } else if(emailFailed){
      showToast(
        activityCreated
          ? "Timeline created, but customer email failed"
          : "Order saved, but customer email failed"
      );
    } else if(activityCreated && emailSent){
      showToast(
        "Order updated, timeline created and customer emailed"
      );
    } else if(activityCreated){
      showToast(
        "Order updated and timeline created"
      );
    } else if(emailSent){
      showToast(
        "Order updated and customer emailed"
      );
    } else {
      showToast("Order updated successfully");
    }

  } catch(error) {
    console.error("Order update failed:", error);

    button.disabled = false;
    button.innerHTML =
      '<i class="fa-solid fa-floppy-disk"></i> Save Changes';

    showToast(error.message || "Unable to update order");
  }
}

    function closeModal(){
      $("orderModal").style.display = "none";
      document.body.style.overflow = "";
      activeOrder = null;
    }

    $("closeFilePreview").addEventListener("click", () => {
    $("filePreviewModal").style.display = "none";
    $("filePreviewFrame").src = "";

    if($("orderModal").style.display !== "flex"){
        document.body.style.overflow = "";
    }
});

    $("filePreviewModal").addEventListener("click", event => {
        if(event.target === $("filePreviewModal")){
            $("closeFilePreview").click();
        }
    });
    $("closeModal").addEventListener("click",closeModal);
    $("orderModal").addEventListener("click",e=>{if(e.target===$("orderModal")) closeModal()});
    ["searchInput","paymentFilter","designFilter"].forEach(id=>$("searchInput") && $(id).addEventListener(id==="searchInput"?"input":"change",renderOrders));
    $("signOutBtn").addEventListener("click",async()=>{await supabase.auth.signOut();window.location.href="index.html"});

    const admin = await guardAdmin();
    if(admin) await loadOrders();