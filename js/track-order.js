import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

    const SUPABASE_URL = "https://pebkryplphawjlmvcfma.supabase.co";
    const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBlYmtyeXBscGhhd2psbXZjZm1hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE2ODg2NjEsImV4cCI6MjA5NzI2NDY2MX0.Sn1IPlLKhJG5u6gTXpB_tUbSr4PThWrWVpHUNDG1zdU";

    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    const $ = id => document.getElementById(id);

    const money = value =>
      new Intl.NumberFormat("en-ZA", {
        style: "currency",
        currency: "ZAR"
      }).format(Number(value || 0));

    const dateTime = value =>
      value
        ? new Date(value).toLocaleString("en-ZA", {
            dateStyle: "medium",
            timeStyle: "short"
          })
        : "—";

    const dateOnly = value =>
      value
        ? new Date(`${value}T00:00:00`).toLocaleDateString("en-ZA", {
            dateStyle: "long"
          })
        : "To be confirmed";

    const safe = value =>
      String(value ?? "").replace(/[&<>"']/g, character => ({
        "&":"&amp;",
        "<":"&lt;",
        ">":"&gt;",
        '"':"&quot;",
        "'":"&#039;"
      }[character]));

    function showError(title, message){
      $("loadingScreen").hidden = true;
      $("dashboard").style.display = "none";
      $("errorScreen").hidden = false;
      $("errorTitle").textContent = title;
      $("errorMessage").textContent = message;
    }

    function serviceNames(order){
      const items = Array.isArray(order.cart) ? order.cart : [];
      if(!items.length) return "Design service";

      return items
        .map(item =>
          item.serviceTitle ||
          item.title ||
          item.serviceId ||
          "Design service"
        )
        .join(", ");
    }

    function timelineIcon(activity){
      const type = String(activity.activity_type || "").toLowerCase();
      const status = String(activity.design_status || "").toLowerCase();

      if(type === "files_uploaded") return "fa-file-arrow-up";
      if(status === "completed") return "fa-flag-checkered";
      if(status === "ready") return "fa-folder-open";
      if(status === "review") return "fa-magnifying-glass";
      if(status === "designing") return "fa-pen-ruler";
      if(status === "waiting") return "fa-clock";
      return "fa-circle-check";
    }

    function fileIcon(file){
      const name = String(file.file_name || "").toLowerCase();
      const mime = String(file.mime_type || "").toLowerCase();

      if(name.endsWith(".pdf") || mime.includes("pdf")) return "fa-file-pdf";
      if(name.endsWith(".zip") || mime.includes("zip")) return "fa-file-zipper";
      if(mime.startsWith("image/") || /\.(png|jpe?g|svg|webp)$/i.test(name)) return "fa-file-image";
      return "fa-file";
    }

    function fileSize(bytes){
      const value = Number(bytes || 0);
      if(value < 1024) return `${value} B`;
      if(value < 1024 * 1024) return `${(value / 1024).toFixed(1)} KB`;
      return `${(value / (1024 * 1024)).toFixed(1)} MB`;
    }


    const STATUS_FLOW = ["waiting","designing","review","ready","completed"];

    function normalizedStatus(value){
      const status = String(value || "waiting").trim().toLowerCase();
      return STATUS_FLOW.includes(status) ? status : "waiting";
    }

    function updateJourney(status){
      const currentStatus = normalizedStatus(status);
      const currentIndex = STATUS_FLOW.indexOf(currentStatus);
      const steps = [...document.querySelectorAll(".journey-step")];

      steps.forEach((step,index) => {
        step.classList.toggle("completed", index < currentIndex || currentStatus === "completed");
        step.classList.toggle("current", index === currentIndex && currentStatus !== "completed");
      });

      const percent = currentIndex <= 0 ? 0 : (currentIndex / (STATUS_FLOW.length - 1)) * 80;

      if(window.innerWidth <= 760){
        $("journeyLine").style.width = "4px";
        $("journeyLine").style.height = `${percent}%`;
      }else{
        $("journeyLine").style.height = "4px";
        $("journeyLine").style.width = `${percent}%`;
      }
    }

    function designerInitials(name){
      if(!name || name === "Not assigned yet") return "96";
      return String(name)
        .split(/\s+/)
        .filter(Boolean)
        .slice(0,2)
        .map(part => part[0])
        .join("")
        .toUpperCase();
    }

    function updateCountdown(value,status){
      if(!value){
        $("countdownText").textContent = "";
        return;
      }

      if(normalizedStatus(status) === "completed"){
        $("countdownText").textContent = "Project completed";
        return;
      }

      const due = new Date(`${value}T23:59:59`);
      const today = new Date();
      const difference = Math.ceil((due - today) / 86400000);

      if(difference > 1){
        $("countdownText").textContent = `${difference} days remaining`;
      }else if(difference === 1){
        $("countdownText").textContent = "Due tomorrow";
      }else if(difference === 0){
        $("countdownText").textContent = "Due today";
      }else{
        $("countdownText").textContent = `${Math.abs(difference)} day${Math.abs(difference) === 1 ? "" : "s"} overdue`;
      }
    }

    function fileExtension(name){
      const match = String(name || "").match(/\.([a-z0-9]+)$/i);
      return match ? match[1] : "FILE";
    }

    function showToast(message){
      $("toastMessage").textContent = message;
      $("toastMessage").classList.add("show");
      clearTimeout(showToast.timer);
      showToast.timer = setTimeout(() => {
        $("toastMessage").classList.remove("show");
      }, 3200);
    }

    function celebrateCompletion(){
      if(sessionStorage.getItem("completionCelebrated") === "yes") return;
      sessionStorage.setItem("completionCelebrated","yes");

      const palette = ["#009b5b","#08699f","#f4bd2a","#e85d75","#7d5fff"];

      for(let index = 0; index < 70; index++){
        const piece = document.createElement("span");
        piece.className = "confetti-piece";
        piece.style.left = `${Math.random() * 100}vw`;
        piece.style.background = palette[Math.floor(Math.random() * palette.length)];
        piece.style.setProperty("--drift", `${(Math.random() - .5) * 240}px`);
        piece.style.animationDuration = `${2.8 + Math.random() * 2.2}s`;
        piece.style.animationDelay = `${Math.random() * .7}s`;
        document.body.appendChild(piece);
        setTimeout(() => piece.remove(), 6000);
      }

      showToast("Your design is complete and ready 🎉");
    }

    function renderTimeline(activities){
      const visible = (activities || []).filter(item =>
        item.visible_to_customer !== false
      );

      if(!visible.length){
        $("timeline").innerHTML = `
          <div class="empty-state">
            No timeline activity has been added yet.
          </div>`;
        return;
      }

      $("timeline").innerHTML = visible.map((activity,index) => `
        <article class="timeline-item ${index === visible.length - 1 ? "latest" : ""}">
          <div class="timeline-icon">
            <i class="fa-solid ${timelineIcon(activity)}"></i>
          </div>
          <div class="timeline-content">
            <h3>${safe(activity.title || "Order updated")}</h3>
            ${activity.description ? `<p>${safe(activity.description)}</p>` : ""}
            <span class="timeline-date">${safe(dateTime(activity.created_at))}</span>
          </div>
        </article>
      `).join("");
    }

    async function renderFiles(files){
      if(!files?.length){
        $("filesList").innerHTML = `
          <div class="empty-state">
            No completed files are available yet.
          </div>`;
        return;
      }

      const filesWithThumbnails = await Promise.all(
  files.map(async file => {
    const name = String(file.file_name || "").toLowerCase();
    const mime = String(file.mime_type || "").toLowerCase();

    const isImage =
      mime.startsWith("image/") ||
      /\.(png|jpe?g|gif|webp|svg)$/i.test(name);

    if(!isImage){
      return file;
    }

    const { data, error } = await supabase.storage
      .from("design-files")
      .createSignedUrl(file.storage_path, 3600);

    return {
      ...file,
      thumbnailUrl: error ? "" : data.signedUrl
    };
  })
);

$("filesList").innerHTML = filesWithThumbnails.map(file => `
        <article class="file-card">
<div class="file-icon">
  ${
    file.thumbnailUrl
      ? `<img
            class="file-thumbnail"
            src="${file.thumbnailUrl}"
            alt="${safe(file.file_name)}"
         >`
      : `<i class="fa-solid ${fileIcon(file)}"></i>`
  }
</div>
          <div class="file-info">
            <div>
    <strong title="${safe(file.label || file.file_name)}">
        ${safe(file.label || file.file_name)}
    </strong>

    <small>${safe(file.file_name)}</small>

    <small>
  ${safe(fileSize(file.size_bytes))} · ${safe(dateTime(file.created_at))}
</small>
</div>
            <span class="file-type-badge">${safe(fileExtension(file.file_name))}</span>
          </div>
          <button
            class="download-btn"
            type="button"
            title="Download ${safe(file.file_name)}"
            data-download-id="${safe(file.id)}"
          >
            <i class="fa-solid fa-download"></i>
          </button>
        </article>
      `).join("");

      document.querySelectorAll("[data-download-id]").forEach(button => {
        button.addEventListener("click", () => {
          downloadFile(button.dataset.downloadId, files, button);
        });
      });
    }

    function setupApprovalActions(orderId, userId){
  const approveBtn = $("approveDesignBtn");
  const requestBtn = $("requestChangesBtn");
  const submitBtn = $("submitChangesBtn");
  const feedbackSection = $("feedbackSection");
  const feedbackInput = $("approvalFeedback");

  requestBtn.onclick = () => {
    feedbackSection.hidden = false;
    feedbackInput.focus();
  };

  approveBtn.onclick = async () => {
    approveBtn.disabled = true;
    approveBtn.innerHTML = `
      <i class="fa-solid fa-spinner fa-spin"></i>
      Submitting...
    `;

    const { error } = await supabase
      .from("order_approvals")
      .insert({
        order_id: orderId,
        user_id: userId,
        decision: "approved",
        feedback: null
      });

    if(error){
      console.error("Approval submission failed:", error);

      approveBtn.disabled = false;
      approveBtn.innerHTML = `
        <i class="fa-solid fa-circle-check"></i>
        Approve design
      `;

      alert("The approval could not be submitted.");
      return;
    }

    await loadApproval(orderId, userId);
  };

  submitBtn.onclick = async () => {
    const feedback = feedbackInput.value.trim();

    if(!feedback){
      alert("Please describe the changes you need.");
      feedbackInput.focus();
      return;
    }

    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <i class="fa-solid fa-spinner fa-spin"></i>
      Submitting...
    `;

    const { error } = await supabase
      .from("order_approvals")
      .insert({
        order_id: orderId,
        user_id: userId,
        decision: "changes_requested",
        feedback
      });

    if(error){
      console.error("Revision request failed:", error);

      submitBtn.disabled = false;
      submitBtn.textContent = "Submit revision request";

      alert("The revision request could not be submitted.");
      return;
    }

    await loadApproval(orderId, userId);
  };
}

    async function loadApproval(orderId, userId){
  const { data, error } = await supabase
    .from("order_approvals")
    .select("*")
    .eq("order_id", orderId)
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if(error){
    console.error("Approval load failed:", error);
    return;
  }

  if(!data) return;

  $("approvalActions").hidden = true;
  $("approvalResult").hidden = false;

  if(data.decision === "approved"){
    $("approvalResult").innerHTML = `
      <strong style="display:block;color:var(--green);margin-bottom:6px;">
        <i class="fa-solid fa-circle-check"></i>
        Design approved
      </strong>
      <span>Your approval was submitted ${safe(dateTime(data.created_at))}.</span>
    `;
  }else{
    $("approvalResult").innerHTML = `
      <strong style="display:block;color:var(--danger);margin-bottom:6px;">
        <i class="fa-solid fa-rotate-left"></i>
        Changes requested
      </strong>
      <span>${safe(data.feedback || "No feedback was provided.")}</span>
      <small style="display:block;margin-top:8px;">
        Submitted ${safe(dateTime(data.created_at))}
      </small>
    `;
  }
}

    function renderItems(order){
      const items = Array.isArray(order.cart) ? order.cart : [];

      if(!items.length){
        $("orderItems").innerHTML = `
          <div class="empty-state">No service details found.</div>`;
        return;
      }

      $("orderItems").innerHTML = items.map(item => {
        const quantity = Number(item.quantity || 1);
        const price = Number(item.price || 0);
        const name =
          item.serviceTitle ||
          item.title ||
          item.serviceId ||
          "Design service";

        const tier = item.tierName ? ` · ${item.tierName}` : "";

        return `
          <div class="order-item">
            <span>${safe(name)}${safe(tier)} × ${quantity}</span>
            <strong>${money(price * quantity)}</strong>
          </div>`;
      }).join("");
    }

    async function downloadFile(fileId, files, button){
  const file = files.find(item => item.id === fileId);
  if(!file) return;

  button.disabled = true;
  button.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>';

  try{
    const { data, error } = await supabase.storage
      .from("design-files")
      .createSignedUrl(file.storage_path, 120);

    if(error) throw error;

    const url = data.signedUrl;

    const name = (file.file_name || "").toLowerCase();
    const mime = (file.mime_type || "").toLowerCase();

    const frame = $("filePreviewFrame");
    const image = $("filePreviewImage");

    frame.style.display = "none";
    image.style.display = "none";

    if(mime.startsWith("image/") || /\.(png|jpe?g|gif|webp|svg)$/i.test(name)){
      image.src = url;
      image.style.display = "block";
      $("filePreviewModal").hidden = false;
    }
    else if(mime.includes("pdf") || name.endsWith(".pdf")){
      frame.src = url;
      frame.style.display = "block";
      $("filePreviewModal").hidden = false;
    }
    else{
      window.open(url, "_blank", "noopener");
    }

  }catch(error){
    console.error(error);
    alert(error.message || "Unable to open file.");
  }finally{
    button.disabled = false;
    button.innerHTML = '<i class="fa-solid fa-download"></i>';
  }
}

    async function loadTrackingPage(){
      const params = new URLSearchParams(window.location.search);
      const requestedOrderId = params.get("id");

      if(!requestedOrderId){
        showError(
          "Missing order link",
          "This tracking link does not contain an order ID."
        );
        return;
      }

      const {
        data: { session },
        error: sessionError
      } = await supabase.auth.getSession();

      if(sessionError){
        showError(
          "Unable to verify your account",
          sessionError.message
        );
        return;
      }

      if(!session){
        const redirectUrl =
          `index.html?redirect=${encodeURIComponent(window.location.href)}`;

        window.location.href = redirectUrl;
        return;
      }

      const { data: order, error: orderError } = await supabase
        .from("orders")
        .select("*")
        .eq("id", requestedOrderId)
        .eq("user_id", session.user.id)
        .maybeSingle();

      if(orderError){
        console.error("Order load failed:", orderError);
        showError("Unable to load this order", orderError.message);
        return;
      }

      if(!order){
        showError(
          "Order not found",
          "This order does not exist or it is not linked to the account you are currently signed in with."
        );
        return;
      }

      const [activityResult, filesResult] = await Promise.all([
        supabase
          .from("order_activity")
          .select("*")
          .eq("order_id", order.id)
          .eq("visible_to_customer", true)
          .order("created_at", { ascending: true }),

        supabase
          .from("order_files")
          .select("*")
          .eq("order_id", order.id)
          .order("created_at", { ascending: false })
      ]);

      if(activityResult.error){
        console.error("Timeline load failed:", activityResult.error);
      }

      if(filesResult.error){
        console.error("Files load failed:", filesResult.error);
      }

      const progress = Math.max(0, Math.min(100, Number(order.progress || 0)));
      const paymentStatus = order.payment_status || "Pending";

      $("orderNumber").textContent = order.order_id || "Order";
      $("serviceName").textContent = serviceNames(order);
      $("designStatus").textContent = order.design_status || "Waiting";
      $("progressValue").textContent = `${progress}%`;
      $("updatedTime").textContent = `Last updated ${dateTime(order.updated_at || order.created_at)}`;
      const designerName = order.assigned_designer || "Not assigned yet";

      $("assignedDesigner").textContent = designerName;
      $("designerAvatar").textContent = designerInitials(designerName);
      $("estimatedDate").textContent = dateOnly(order.estimated_completion_date);
      $("orderTotal").textContent = money(order.totals?.total);
      $("latestUpdate").textContent =
        order.customer_update ||
        "Your order has been received and is waiting to be started.";

      updateJourney(order.design_status);
      updateCountdown(order.estimated_completion_date, order.design_status);

      if(normalizedStatus(order.design_status) === "completed"){
        setTimeout(celebrateCompletion, 500);
      }

      $("paymentBadge").classList.toggle(
        "paid",
        paymentStatus.toLowerCase() === "paid"
      );

      $("paymentBadge").innerHTML = `
        <i class="fa-solid ${
          paymentStatus.toLowerCase() === "paid"
            ? "fa-circle-check"
            : "fa-clock"
        }"></i>
        <span>${safe(paymentStatus)}</span>`;

      renderTimeline(activityResult.data || []);
      renderFiles(filesResult.data || []);
      renderItems(order);
      setupApprovalActions(order.id, session.user.id);
      await loadApproval(order.id, session.user.id);

      $("loadingScreen").hidden = true;
      $("loadingScreen").style.display = "none";
      $("errorScreen").hidden = true;
      $("errorScreen").style.display = "none";
      $("dashboard").style.display = "block";

      requestAnimationFrame(() => {
        $("progressFill").style.width = `${progress}%`;
      });

      subscribeToOrderUpdates(order.id);
    }

    let realtimeChannel = null;
    let refreshTimer = null;

    function subscribeToOrderUpdates(orderId){
      if(realtimeChannel) supabase.removeChannel(realtimeChannel);

      realtimeChannel = supabase
        .channel(`track-order-${orderId}`)
        .on(
          "postgres_changes",
          { event:"*", schema:"public", table:"orders", filter:`id=eq.${orderId}` },
          scheduleLiveRefresh
        )
        .on(
          "postgres_changes",
          { event:"*", schema:"public", table:"order_activity", filter:`order_id=eq.${orderId}` },
          scheduleLiveRefresh
        )
        .on(
          "postgres_changes",
          { event:"*", schema:"public", table:"order_files", filter:`order_id=eq.${orderId}` },
          scheduleLiveRefresh
        )
        .subscribe();
    }

    function scheduleLiveRefresh(){
      clearTimeout(refreshTimer);
      refreshTimer = setTimeout(async () => {
        showToast("New order update received");
        await loadTrackingPage();
      }, 650);
    }

    window.addEventListener("resize", () => {
      updateJourney($("designStatus").textContent);
    });

    function closeFilePreview(){
  $("filePreviewModal").hidden = true;
  $("filePreviewFrame").src = "";
  $("filePreviewImage").src = "";
}

$("closeFilePreview").addEventListener("click", closeFilePreview);

document.querySelector(".preview-overlay").addEventListener("click", closeFilePreview);

    $("signOutBtn").addEventListener("click", async () => {
      await supabase.auth.signOut();
      window.location.href = "index.html";
    });

    $("year").textContent = new Date().getFullYear();

    loadTrackingPage();