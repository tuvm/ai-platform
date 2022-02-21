const overviewContent = `
<h1>1.&nbsp; Introduction</h1>
<p>VinDr-ChestXR is a Computer-Aided Diagnosis (CAD) software that automatically analyzes an image in DICOM format and notifies users of the presence of suspicious findings in the image. The mandatory view is posterior-anterior (<strong>PA</strong>) or anterior-posterior (<strong>AP</strong>). The primary benefit of the software is the ability to reduce the time it takes to alert radiologists/physicians to the presence of a suspicious finding. The software does not recommend treatment or provide a diagnosis. It is only meant as a tool to assist in improving workload prioritization of suspicious cases. The final diagnosis is provided by a radiologist/physician after reviewing the scan on his/her own.</p>
<p>&nbsp;</p>
<p>The analysis of VinDr-ChestXR includes:</p>
<ul>
<li>
<p>A lesion detection: each lesion on the image is surrounded with a rectangle and labeled with one of the pre-defined lesion classes as indicated in Section 3;</p></li>
<li>
<p>An image classification: each image is classified in terms of normal/abnormal</p></li></ul>
<p>&nbsp;</p>
<p>A visualization of analysis results of VinDr-ChestXR is shown in Figure 1. We provide quantitative performances of the lesion detection and the image classification on a test dataset in Section 6.</p>
<p>&nbsp;</p>
<p>VinDr-ChestXR is distributed as an Application Programming Interface (API). The input to the API is an image in DICOM format that satisfies the validation dictated in Section 2. The output of the API is a JSON (JavaScript Object Notation) file with the structure given in Section 4. A snippet of Python code is provided in Section 5 to illustrate how the API should be called.</p><ac:image ac:align="center" ac:layout="center" ac:original-height="435" ac:original-width="468" ac:width="566"><ri:attachment ri:filename="image-20220112-030616.png" ri:version-at-save="1" /><ac:caption>
<p><br /><em><strong>Figure 1. </strong>A visualization of VinDr-ChestXR's analysis results.</em></p></ac:caption></ac:image>
<h1>2.&nbsp; Input validation</h1>
<p>An input to VinDr-ChestXR must be a DICOM X-ray image of the chest at either posterior-anterior (<strong>AP</strong>) or anterior-posterior (<strong>AP</strong>) view. Table 1 gives the full list of DICOM tags that VinDr-ChestXR requires for a valid image.</p>
<p><em><strong>Table 1</strong>. List of required DICOM tags for the input to VinDr-ChestXR. Required values for each tag are also given.</em></p>
<table data-layout="default" ac:local-id="6ba9cca3-0477-4ac9-a406-97df4b21e336"><colgroup><col style="width: 226.67px;" /><col style="width: 226.67px;" /><col style="width: 226.67px;" /></colgroup>
<tbody>
<tr>
<td>
<p><strong>Tag</strong></p></td>
<td>
<p><strong>Keyword</strong></p></td>
<td>
<p><strong>Required Value</strong></p></td></tr>
<tr>
<td>
<p>(0008,0060)</p></td>
<td>
<p>Modality</p></td>
<td>
<p>CR or DX or XR or DR</p></td></tr>
<tr>
<td>
<p>(0020,000D)</p></td>
<td>
<p>StudyInstanceUID</p></td>
<td>
<p>Non-empty</p></td></tr>
<tr>
<td>
<p>(0008,0018)</p></td>
<td>
<p>SOPInstanceUID</p></td>
<td>
<p>Non-empty</p></td></tr>
<tr>
<td>
<p>(0028,0004)</p></td>
<td>
<p>PhotometricInterpretation</p></td>
<td>
<p>Non-empty</p></td></tr>
<tr>
<td>
<p>(7FE0,0010)</p></td>
<td>
<p>PixelData</p></td>
<td>
<p>Non-empty</p></td></tr></tbody></table>
<h1>3.&nbsp; Identifiable abnormalities</h1>
<p>A predefined list of 18 abnormalities that can be analyzed by VinDr-ChestXR is provided in Table 2. Any lesion of one of the provided classes will be localized on each image by a bounding box.</p>
<p><em><strong>Table 2</strong>. List of abnormalities identifiable by VinDr-ChestXR.</em></p>
<table data-layout="default" ac:local-id="43464a1f-2fad-42bf-8bd1-5e1c5f35e581"><colgroup><col style="width: 136.0px;" /><col style="width: 136.0px;" /><col style="width: 136.0px;" /><col style="width: 136.0px;" /><col style="width: 136.0px;" /></colgroup>
<tbody>
<tr>
<td colspan="5">
<p><strong>Lesion Label</strong></p></td></tr>
<tr>
<td>
<p>Aortic enlargement</p></td>
<td>
<p>Clavicle fracture</p></td>
<td>
<p>Infiltration</p></td>
<td>
<p>Pleural effusion</p></td>
<td>
<p>Rib fracture</p></td></tr>
<tr>
<td>
<p>Atelectasis</p></td>
<td>
<p>Consolidation</p></td>
<td>
<p>ILD</p></td>
<td>
<p>Pleural thickening</p></td>
<td>
<p>Other lesion</p></td></tr>
<tr>
<td>
<p>Calcification</p></td>
<td>
<p>Emphysema</p></td>
<td>
<p>Nodule/Mass</p></td>
<td>
<p>Pneumothorax</p></td>
<td>
<p>&nbsp;</p></td></tr>
<tr>
<td>
<p>Cardiomegaly</p></td>
<td>
<p>Enlarged PA</p></td>
<td>
<p>Opacity</p></td>
<td>
<p>Pulmonary fibrosis</p></td>
<td>
<p>&nbsp;</p></td></tr></tbody></table>
<h1><em>&nbsp;</em>4.&nbsp; Output format</h1>
<p>For a valid image, VinDr-ChestXR returns:</p>
<ul>
<li>
<p>Abnormality probability indicating the presence of any benign or malignant anomaly in the image.</p></li>
<li>
<p>Lesions in each image with the name, probability, and bounding box coordinates.</p></li></ul>
<p>Detailed description of the output format:</p>
<ul>
<li>
<p>global</p>
<ul>
<li>
<p><strong>abnormal</strong>: The probability for the presence of any benign or malignant anomaly in the image.</p></li></ul></li>
<li>
<p><strong>local</strong>: The list of lesions predicted in the corresponding image.</p>
<ul>
<li>
<p><strong>name</strong>: Label of the lesion, e.g. Nodule/Mass, Calcification, or Cardiomegaly.</p></li>
<li>
<p> <strong>prob</strong>: The probability of the lesion. </p></li>
<li>
<p><strong>start</strong>: The top-left corner of the bounding box, specified by x and y coordinates.</p></li>
<li>
<p><strong>end</strong>: The bottom-right corner of the bounding box, specified x and y coordinates.</p></li></ul></li></ul>
<p>An example of the prediction results in JSON format is shown in the following snippet.</p><ac:structured-macro ac:name="code" ac:schema-version="1" ac:macro-id="e89e7c13-35f3-4adf-88a2-f46f862a95e0"><ac:parameter ac:name="language">json</ac:parameter><ac:plain-text-body><![CDATA[{
        "global": {
            "Abnormal": 0.6106124917666117
        },
        "local": [
            {
                "prob": [
                    0.568917490541935
                ],
                "name": [
                    "Pleural thickening"
                ],
                "start": {
                    "x": 1994,
                    "y": 310
                },
                "end": {
                    "x": 2252,
                    "y": 410
                }
            }
        ]
    }]]></ac:plain-text-body></ac:structured-macro>
<h1>5.&nbsp; API Call</h1>
<p>The following snippet of Python code illustrates how the VinDr-ChestXR API should be called.</p>
<p><br /></p><ac:structured-macro ac:name="code" ac:schema-version="1" ac:macro-id="68cffc5b-bdd0-4e44-925a-9be370fb78b9"><ac:parameter ac:name="language">py</ac:parameter><ac:plain-text-body><![CDATA[import requests
from io import BytesIO from loguru import logger
from pydicom import dcmread, dcmwrite from pydicom.filebase import DicomFileLike
from tenacity import retry, stop_after_attempt, wait_fixed, after_log


class InstanceWorkflow: ai_model = "chestxray" api_key = "YOUR API KEY"
VINDR_AI_URL = "https://apiserver.vindr.ai" result = {}

def init (self, dicom_file_path): self.dicom_files = {}
dicom_file = dcmread(dicom_file_path)
dicom_bytes = self.convert_dataset_to_bytes(dicom_file) self.dicom_files["file"] = dicom_bytes

def convert_dataset_to_bytes(self, dataset): with BytesIO() as buffer:
ds = DicomFileLike(buffer) dcmwrite(ds, dataset) ds.seek(0)
return ds.read()

def call(self):
r = requests.Session() r.headers = {
"X-API-KEY": self.api_key,
}

# Calling the API, obtaining the job_id to track the analysis process
res = r.post(
f"{self.VINDR_AI_URL}/diagnosis/{self.ai_model}", files=self.dicom_files,
)
if res.status_code != 200: print(f"Response body: {res.text}")
res.raise_for_status() job_id = res.json()["job_id"]

# Polling until the analysis process finishes.
@retry(
stop=stop_after_attempt(1000), wait=wait_fixed(5),
after=after_log(logger, logging.DEBUG),
)
def check_result(): res = r.get(
f"{self.VINDR_AI_URL}/jobs/{job_id}",
)
job = res.json()
if job.get("status") not in {"DONE", "FAIL"}: raise Exception("Retry in 1s")
check_result()

# Retrieving the analysis result
res = r.get(
f"{self.VINDR_AI_URL}/jobs/{job_id}/result",
)
res.raise_for_status() self.result = res.json()


test_api = InstanceWorkflow('path-to-dicom-file') test_api.call()
print(test_api.result)]]></ac:plain-text-body></ac:structured-macro>
<h1>6.&nbsp; Performance data</h1>
<p>The performance of VinDr-ChestXR was measured by the F2-score [1] on a test dataset that were retrospectively collected from several hospitals in Vietnam. This dataset includes 10,271 images of PA/AP view. The statistics of normal/abnormal cases as well as lesions in the test dataset are given Figure 2 and Table 3, respectively. We chose F2-score as the metric for both the lesion detection and breast classification since it favors the recall (or sensitivity) over the precision. This measurement, therefore, closely reflects the ability of VinDr-ChestXR to assist radiologists/physicians in spotting abnormalities. Detailed results for the lesion detection and the abnormality classification are given in Tables 4 and 5, respectively. The average processing time is about 1 seconds per study, not including data transfer.</p>
<p /><ac:image ac:align="center" ac:layout="center" ac:original-height="246" ac:original-width="321" ac:width="453"><ri:attachment ri:filename="image-20220112-031150.png" ri:version-at-save="1" /><ac:caption>
<p><em><strong>Figure 2</strong>. Distribution of normal/abnormal cases in the test dataset.</em></p></ac:caption></ac:image>
<p />
<table data-layout="default" ac:local-id="718446b1-a592-4af8-b4c2-c0bc199ece9e"><colgroup><col style="width: 226.67px;" /><col style="width: 226.67px;" /><col style="width: 226.67px;" /></colgroup>
<tbody>
<tr>
<td colspan="3">
<p style="text-align: center;"><em>&nbsp;<strong>Table 3. </strong>Number of lesions in the test dataset</em></p></td></tr>
<tr>
<td>
<p><strong>Lesion</strong></p></td>
<td>
<p><strong># Boxes</strong></p></td>
<td>
<p><strong># Images (with percentage)</strong></p></td></tr>
<tr>
<td>
<p>Aortic enlargement</p></td>
<td>
<p>1490</p></td>
<td>
<p>1385 (13.48%)</p></td></tr>
<tr>
<td>
<p>Atelectasis</p></td>
<td>
<p>345</p></td>
<td>
<p>304 (2.96%)</p></td></tr>
<tr>
<td>
<p>Calcification</p></td>
<td>
<p>801</p></td>
<td>
<p>651 (6.34%)</p></td></tr>
<tr>
<td>
<p>Cardiomegaly</p></td>
<td>
<p>1714</p></td>
<td>
<p>1701 (16.56%)</p></td></tr>
<tr>
<td>
<p>Clavicle fracture</p></td>
<td>
<p>55</p></td>
<td>
<p>54 (0.53%)</p></td></tr>
<tr>
<td>
<p>Consolidation</p></td>
<td>
<p>524</p></td>
<td>
<p>408 (3.97%)</p></td></tr>
<tr>
<td>
<p>Emphysema</p></td>
<td>
<p>181</p></td>
<td>
<p>109 (1.06%)</p></td></tr>
<tr>
<td>
<p>Enlarged PA</p></td>
<td>
<p>87</p></td>
<td>
<p>68 (0.66%)</p></td></tr>
<tr>
<td>
<p>Infiltration</p></td>
<td>
<p>542</p></td>
<td>
<p>384 (3.74%)</p></td></tr>
<tr>
<td>
<p>ILD</p></td>
<td>
<p>1541</p></td>
<td>
<p>986 (9.60%)</p></td></tr>
<tr>
<td>
<p>Nodule/Mass</p></td>
<td>
<p>1306</p></td>
<td>
<p>779 (7.58%)</p></td></tr>
<tr>
<td>
<p>Opacity</p></td>
<td>
<p>776</p></td>
<td>
<p>577 (5.62%)</p></td></tr>
<tr>
<td>
<p>Other lesion</p></td>
<td>
<p>740</p></td>
<td>
<p>555 (5.40%)</p></td></tr>
<tr>
<td>
<p>Pleural effusion</p></td>
<td>
<p>737</p></td>
<td>
<p>535 (5.21%)</p></td></tr>
<tr>
<td>
<p>Pleural thickening</p></td>
<td>
<p>1159</p></td>
<td>
<p>727 (7.08%)</p></td></tr>
<tr>
<td>
<p>Pneumothorax</p></td>
<td>
<p>81</p></td>
<td>
<p>61 (0.59%)</p></td></tr>
<tr>
<td>
<p>Pulmonary fibrosis</p></td>
<td>
<p>1309</p></td>
<td>
<p>810 (7.89%)</p></td></tr>
<tr>
<td>
<p>Rib fracture</p></td>
<td>
<p>182</p></td>
<td>
<p>129 (1.26%)</p></td></tr>
<tr>
<td>
<p>None of the above</p></td>
<td>
<p>&nbsp;</p></td>
<td>
<p>5936 (57.79%)</p></td></tr></tbody></table>
<p />
<table data-layout="default" ac:local-id="09367aea-329d-4142-9479-c6d839618fff"><colgroup><col style="width: 340.0px;" /><col style="width: 340.0px;" /></colgroup>
<tbody>
<tr>
<td colspan="2">
<p><em><strong>Table 4. </strong>Performance of the lesion detection of VinDr-ChestXR</em></p></td></tr>
<tr>
<td>
<p><em>&nbsp;</em><strong>Lesion</strong></p></td>
<td>
<p><em>&nbsp;</em><strong>Performance (F2)</strong></p></td></tr>
<tr>
<td>
<p><em>&nbsp;</em>Aortic enlargement</p></td>
<td>
<p><em>&nbsp;</em>65.28%</p></td></tr>
<tr>
<td>
<p>Atelectasis</p></td>
<td>
<p>28.82%</p></td></tr>
<tr>
<td>
<p>Calcification</p></td>
<td>
<p>48.27%</p></td></tr>
<tr>
<td>
<p>Cardiomegaly</p></td>
<td>
<p>78.91%</p></td></tr>
<tr>
<td>
<p>Clavicle fracture</p></td>
<td>
<p>53.81%</p></td></tr>
<tr>
<td>
<p>Consolidation</p></td>
<td>
<p>55.42%</p></td></tr>
<tr>
<td>
<p>Emphysema</p></td>
<td>
<p>35.22%</p></td></tr>
<tr>
<td>
<p>Enlarged PA</p></td>
<td>
<p>27.34%</p></td></tr>
<tr>
<td>
<p>Infiltration</p></td>
<td>
<p>38.58%</p></td></tr>
<tr>
<td>
<p>ILD</p></td>
<td>
<p>55.31%</p></td></tr>
<tr>
<td>
<p>Nodule/Mass</p></td>
<td>
<p>42.55%</p></td></tr>
<tr>
<td>
<p>Opacity</p></td>
<td>
<p>13.77%</p></td></tr>
<tr>
<td>
<p>Other lesion</p></td>
<td>
<p>25.42%</p></td></tr>
<tr>
<td>
<p>Pleural effusion</p></td>
<td>
<p>59.65%</p></td></tr>
<tr>
<td>
<p>Pleural thickening</p></td>
<td>
<p>33.34%</p></td></tr>
<tr>
<td>
<p>Pneumothorax</p></td>
<td>
<p>57.15%</p></td></tr>
<tr>
<td>
<p>Pulmonary fibrosis</p></td>
<td>
<p>43.44%</p></td></tr>
<tr>
<td>
<p>Rib fracture</p></td>
<td>
<p>48.85%</p></td></tr>
<tr>
<td>
<p><strong>Average</strong></p></td>
<td>
<p>45.06%</p></td></tr></tbody></table>
<p />
<table data-layout="default" ac:local-id="e46a2588-f4e4-4f14-a751-ad333643e0b4"><colgroup><col style="width: 340.0px;" /><col style="width: 340.0px;" /></colgroup>
<tbody>
<tr>
<td colspan="2">
<p><em><strong>Table 5. </strong>Performance of the image classification of VinDr-ChestXR</em></p></td></tr>
<tr>
<td>
<p><strong>Class</strong></p></td>
<td>
<p><em>&nbsp;P</em><strong>erformance (F2)</strong></p></td></tr>
<tr>
<td>
<p>Abnormal</p></td>
<td>
<p>86.72%</p></td></tr></tbody></table>
<p />
<h2>REFERENCES</h2>
<p>[1] <a href="https://en.wikipedia.org/wiki/F-score">h ttps://en.wikipedia.org/wiki/F-score</a></p>
<p />`;

export default overviewContent;
