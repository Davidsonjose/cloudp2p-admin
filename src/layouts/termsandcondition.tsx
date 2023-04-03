// import AuthWrapper from 'components/wrappers/auth-wrapper';
// import { useForm } from "react-hook-form";
// import Input from 'components/form-control/input';
import React, { useEffect, useState } from 'react';
import { LOGO } from 'assets';
import { BALOSH } from 'assets';
import { useNavigate } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { useForm } from 'react-hook-form';
import Input from 'components/form-control/input';
import { getAdminToken } from 'common';
import axios from 'axios';
import API_URL from 'config';

interface mainLayoutTypes {
	children: JSX.Element;
}

function TermsAndCondition(props: any) {
	const { showmodal, setShowModal, setCheckTwo, setCheckOne } = props;
	return (
		<>
			{showmodal ? (
				<>
					<div className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
						<div className='relative w-auto my-6 mx-auto max-w-3xl'>
							{/*content*/}
							<div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
								{/*header*/}
								<div
									className='flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t'
									style={{
										background: `linear-gradient(90deg, rgba(12, 57, 174, 0.588542) 46.76%, #AE0C0C 59.32%, rgba(248, 2, 46, 0.0403111) 122.42%, rgba(12, 67, 174, 0) 122.43%)`,
									}}
								>
									<h3 className='text-3xl font-semibold text-white'>Terms and Condition</h3>
									<button
										className='p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none'
										onClick={() => setShowModal(false)}
									>
										<span className='bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none'>
											×
										</span>
									</button>
								</div>
								{/*body*/}
								<div className='relative p-6 flex-auto h-72 overflow-y-scroll'>
									<>
										<div className='w-full px-8 pt-4 pb-8'>
											<p className='mb-2'>TERMS AND CONDITIONS</p>

											<div className='flex flex-row mb-4'>
												<div className='w-5 text-sm font-semibold'>1.0 </div>

												<p className='text-sm font-semibold ml-4'>
													<>Introduction</>
												</p>
											</div>
											<div className='ml-6'>
												<p className='text-xs ml-4'>
													<>
														Welcome to <span className='font-bold'>LFZ Access</span> (“Company”,
														“we”, “our”, “us”)! These Terms of Service (“Terms”, “Terms of Service”)
														govern your use of our Access Control Application hosted via the web and
														also on Mobile(together or individually “ Service”) operated by{' '}
														<span className='font-bold'>Lagos Free Zone Company</span>
														.
														<div className='my-2' />
														Our Privacy Policy also governs your use of our Service and explains how
														we collect, safeguard and disclose information that results from your
														use of our web pages. Your agreement with us includes these Terms and
														our Privacy Policy (“Agreements”). You acknowledge that you have read
														and understood the Agreements, and agree to be bound by them. If you do
														not agree with (or cannot comply with) Agreements, then you may not use
														the Service, but please let us know by emailing gokil@tolaram.com so we
														can try to find a solution. These Terms apply to all visitors, users,
														and others who wish to access or use the Service.
													</>
												</p>
											</div>

											<div className='flex flex-row mb-4'>
												<div className='w-5 text-sm font-semibold'>2.0 </div>

												<p className='text-sm font-semibold ml-4'>
													<>Content</>
												</p>
											</div>
											<div className='ml-6'>
												<p className='text-xs ml-4'>
													<>
														Our Service allows you to upload, link, store, share, and otherwise make
														available certain information, text, or other material (“Content”). You
														are responsible for Content that you upload on or through the Service,
														including its legality, reliability, and appropriateness. By uploading
														Content on or through Service, You represent and warrant that: (i)
														Content is yours (you own it) and/or you have the right to use it and
														the right to grant us the rights and license as provided in these Terms,
														and (ii) that the posting of your Content on or through Service does not
														violate the privacy rights, publicity rights, copyrights, contract
														rights or any other rights of any person or entity. We reserve the right
														to terminate the account of anyone found to be infringing on a
														copyright. You retain any and all of your rights to any Content you
														submit, post, or display on or through Service and you are responsible
														for protecting those rights. We take no responsibility and assume no
														liability for the Content you or any third party uploads on or through
														the Service. Lagos Free Zone Company has the right but not the
														obligation to monitor and edit all Content provided by users. In
														addition, Content found on or through this Service are the property of
														Lagos Free Zone Company or used with permission. You may not distribute,
														modify, transmit, reuse, download, repost, copy, or use said Content,
														whether in whole or in part, for commercial purposes or for personal
														gain, without express advance written permission from us.
													</>
												</p>
											</div>

											<>
												<div className='flex flex-row mb-4'>
													<div className='w-5 text-sm font-semibold'>3.0 </div>

													<p className='text-sm font-semibold ml-4'>Prohibited Uses</p>
												</div>
												<p className='text-xs'>
													You may use Service only for lawful purposes and in accordance with the
													Terms. You agree not to use Service:
												</p>

												<div className='ml-6'>
													<div className='flex flex-row mb-4'>
														<div className='w-5 text-xs'>3.1 </div>

														<p className='text-xs ml-4'>
															To impersonate or attempt to impersonate Company, a Company employee,
															another user, or any other person or entity.
														</p>
													</div>
												</div>
												<div className='ml-6'>
													<div className='flex flex-row mb-4'>
														<div className='w-5 text-xs'>3.2 </div>

														<p className='text-xs ml-4'>
															In any way that infringes upon the rights of others, or in any way is
															illegal, threatening, fraudulent, or harmful, or in connection with
															any unlawful, illegal, fraudulent, or harmful purpose or activity.
														</p>
													</div>
												</div>
												<div className='ml-6'>
													<div className='flex flex-row mb-4'>
														<div className='w-5 text-xs'>13.3 </div>

														<p className='text-xs ml-4'>
															To engage in any other conduct that restricts or inhibits anyone’s use
															or enjoyment of Service, or which, as determined by us, may harm or
															offend Company or users of Service or expose them to liability.
														</p>
													</div>
												</div>
												<div className='ml-6'>
													<div className='flex flex-row mb-4'>
														<div className='w-5 text-xs'>3.4 </div>

														<p className='text-xs ml-4'>
															Use Service in any manner that could disable, overburden, damage, or
															impair Service or interfere with any other party’s use of Service,
															including their ability to engage in real-time activities through
															Service.
														</p>
													</div>
												</div>
												<div className='ml-6'>
													<div className='flex flex-row mb-4'>
														<div className='w-5 text-xs'>3.5 </div>

														<p className='text-xs ml-4'>
															Use any robot, spider, or other automatic devices, process, or means
															to access Service for any purpose, including monitoring or copying any
															of the material on Service.
														</p>
													</div>
												</div>
												<div className='ml-6'>
													<div className='flex flex-row mb-4'>
														<div className='w-5 text-xs'>3.6 </div>

														<p className='text-xs ml-4'>
															Use any manual process to monitor or copy any of the material on
															Service or for any other unauthorized purpose without our prior
															written consent.
														</p>
													</div>
												</div>
												<div className='ml-6'>
													<div className='flex flex-row mb-4'>
														<div className='w-5 text-xs'>3.7 </div>

														<p className='text-xs ml-4'>
															Use any device, software, or routine that interferes with the proper
															working of Service.
														</p>
													</div>
												</div>
												<div className='ml-6'>
													<div className='flex flex-row mb-4'>
														<div className='w-5 text-xs'>3.8 </div>

														<p className='text-xs ml-4'>
															Introduce any viruses, trojan horses, worms, logic bombs, or other
															material which is malicious or technologically harmful.
														</p>
													</div>
												</div>
												<div className='ml-6'>
													<div className='flex flex-row mb-4'>
														<div className='w-5 text-xs'>3.9 </div>

														<p className='text-xs ml-4'>
															Attempt to gain unauthorized access to, interfere with, damage, or
															disrupt any parts of Service, the server on which Service is stored,
															or any server, computer, or database connected to Service.
														</p>
													</div>
												</div>
												<div className='ml-6'>
													<div className='flex flex-row mb-4'>
														<div className='w-5 text-xs'>3.10 </div>

														<p className='text-xs ml-4'>
															Attack Service via a denial-of-service attack or a distributed
															denial-of-service attack.
														</p>
													</div>
												</div>
												<div className='ml-6'>
													<div className='flex flex-row mb-4'>
														<div className='w-5 text-xs'>3.11 </div>

														<p className='text-xs ml-4'>
															Take any action that may damage or falsify Company rating.
														</p>
													</div>
												</div>
												<div className='ml-6'>
													<div className='flex flex-row mb-4'>
														<div className='w-5 text-xs'>3.12 </div>

														<p className='text-xs ml-4'>
															Otherwise attempt to interfere with the proper working of Service.
														</p>
													</div>
												</div>

												<div className='flex flex-row mb-4'>
													<div className='w-5 text-sm font-semibold'>4.0 </div>

													<p className='text-sm font-semibold ml-4'>
														<>Analytics</>
													</p>
												</div>
												<div className='ml-6'>
													<p className='text-xs ml-4'>
														<>
															We may use third-party Service Providers to monitor and analyze the
															use of our Service.
														</>
													</p>
												</div>

												<div className='flex flex-row mb-4'>
													<div className='w-5 text-sm font-semibold'>5.0 </div>

													<p className='text-sm font-semibold ml-4'>
														<>No Use by External Individuals</>
													</p>
												</div>
												<div className='ml-6'>
													<p className='text-xs ml-4'>
														<>
															Service is intended only for access and use by individuals who are
															members of staff of the Zone or other registered enterprises within
															the Lagos Free Zone Company or any other Vendor who has been granted
															access by the Lagos Free Zone Company. If you are a part of the above
															listed, you are prohibited from both access and usage of Service.
														</>
													</p>
												</div>
												<div className='flex flex-row mb-4'>
													<div className='w-5 text-sm font-semibold'>6.0 </div>

													<p className='text-sm font-semibold ml-4'>
														<>Accounts</>
													</p>
												</div>
												<div className='ml-6'>
													<p className='text-xs ml-4'>
														<>
															You are responsible for maintaining the confidentiality of your
															account and password, including but not limited to the restriction of
															access to your computer and/or account. You agree to accept
															responsibility for any and all activities or actions that occur under
															your account and/or password, whether your password is with our
															Service or a third-party service. You must notify us immediately upon
															becoming aware of any breach of security or unauthorized use of your
															account. We reserve the right to refuse service, terminate accounts,
															remove or edit content, or cancel orders at our sole discretion.
														</>
													</p>
												</div>
												<div className='flex flex-row mb-4'>
													<div className='w-5 text-sm font-semibold'>7.0 </div>

													<p className='text-sm font-semibold ml-4'>
														<>Accounts</>
													</p>
												</div>
												<div className='ml-6'>
													<p className='text-xs ml-4'>
														<>
															You are responsible for maintaining the confidentiality of your
															account and password, including but not limited to the restriction of
															access to your computer and/or account. You agree to accept
															responsibility for any and all activities or actions that occur under
															your account and/or password, whether your password is with our
															Service or a third-party service. You must notify us immediately upon
															becoming aware of any breach of security or unauthorized use of your
															account. We reserve the right to refuse service, terminate accounts,
															remove or edit content, or cancel orders at our sole discretion.
														</>
													</p>
												</div>
												<div className='flex flex-row mb-4'>
													<div className='w-5 text-sm font-semibold'>8.0 </div>

													<p className='text-sm font-semibold ml-4'>Intellectual Property</p>
												</div>
												<div className='ml-6'>
													<p className='text-xs ml-4'>
														<>
															Service and its original content (excluding Content provided by
															users), features and functionality are and will remain the exclusive
															property of Lagos Free Zone Company and its licensors. Service is
															protected by copyright, trademark, and other laws of and foreign
															countries. Our trademarks may not be used in connection with any
															product or service without the prior written consent of Lagos Free
															Zone Company.
														</>
													</p>
												</div>
												<div className='flex flex-row mb-4'>
													<div className='w-5 text-sm font-semibold'>9.0 </div>

													<p className='text-sm font-semibold ml-4'>Error Reporting and Feedback</p>
												</div>
												<div className='ml-6'>
													<p className='text-xs ml-4'>
														<>
															You may provide us either directly at gokil@tolaram.com with
															information and feedback concerning errors, suggestions for
															improvements, ideas, problems, complaints, and other matters related
															to our Service (“Feedback”). You acknowledge and agree that: (i) you
															shall not retain, acquire or assert any intellectual property right or
															other right, title or interest in or to the Feedback; (ii) Company may
															have development ideas similar to the Feedback; (iii) Feedback does
															not contain confidential information or proprietary information from
															you or any third party; and (iv) Company is not under any obligation
															of confidentiality with respect to the Feedback. In the event the
															transfer of the ownership to the Feedback is not possible due to
															applicable mandatory laws, you grant Company and its affiliates an
															exclusive, transferable, irrevocable, free-of-charge, sub-licensable,
															unlimited and perpetual right to use (including copy, modify, create
															derivative works, publish, distribute and commercialize) Feedback in
															any manner and for any purpose.
														</>
													</p>
												</div>
												<div className='flex flex-row mb-4'>
													<div className='w-5 text-sm font-semibold'>10.0 </div>

													<p className='text-sm font-semibold ml-4'>Disclaimer Of Warranty</p>
												</div>
												<div className='ml-6'>
													<p className='text-xs ml-4'>
														THESE SERVICES ARE PROVIDED BY COMPANY ON AN “AS IS” AND “AS AVAILABLE”
														BASIS. COMPANY MAKES NO REPRESENTATIONS OR WARRANTIES OF ANY KIND,
														EXPRESS OR IMPLIED, AS TO THE OPERATION OF THEIR SERVICES, OR THE
														INFORMATION, CONTENT OR MATERIALS INCLUDED THEREIN. YOU EXPRESSLY AGREE
														THAT YOUR USE OF THESE SERVICES, THEIR CONTENT, AND ANY SERVICES OR
														ITEMS OBTAINED FROM US IS AT YOUR SOLE RISK. NEITHER COMPANY NOR ANY
														PERSON ASSOCIATED WITH COMPANY MAKES ANY WARRANTY OR REPRESENTATION WITH
														RESPECT TO THE COMPLETENESS, SECURITY, RELIABILITY, QUALITY, ACCURACY,
														OR AVAILABILITY OF THE SERVICES. WITHOUT LIMITING THE FOREGOING, NEITHER
														COMPANY NOR ANYONE ASSOCIATED WITH COMPANY REPRESENTS OR WARRANTS THAT
														THE SERVICES, THEIR CONTENT, OR ANY SERVICES OR ITEMS OBTAINED THROUGH
														THE SERVICES WILL BE ACCURATE, RELIABLE, ERROR-FREE, OR UNINTERRUPTED,
														THAT DEFECTS WILL BE CORRECTED, THAT THE SERVICES OR THE SERVER THAT
														MAKES IT AVAILABLE ARE FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS OR
														THAT THE SERVICES OR ANY SERVICES OR ITEMS OBTAINED THROUGH THE SERVICES
														WILL OTHERWISE MEET YOUR NEEDS OR EXPECTATIONS. COMPANY HEREBY DISCLAIMS
														ALL WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED, STATUTORY, OR
														OTHERWISE, INCLUDING BUT NOT LIMITED TO ANY WARRANTIES OF
														MERCHANTABILITY, NON-INFRINGEMENT, AND FITNESS FOR PARTICULAR PURPOSE.
														THE FOREGOING DOES NOT AFFECT ANY WARRANTIES WHICH CANNOT BE EXCLUDED OR
														LIMITED UNDER APPLICABLE LAW.
													</p>
												</div>
												<div className='flex flex-row mb-4'>
													<div className='w-5 text-sm font-semibold'>11.0 </div>

													<p className='text-sm font-semibold ml-4'>Limitation Of Liability</p>
												</div>
												<div className='ml-6'>
													<p className='text-xs ml-4'>
														EXCEPT AS PROHIBITED BY LAW, YOU WILL HOLD US AND OUR OFFICERS,
														DIRECTORS, EMPLOYEES, AND AGENTS HARMLESS FOR ANY INDIRECT, PUNITIVE,
														SPECIAL, INCIDENTAL, OR CONSEQUENTIAL DAMAGE, HOWEVER IT ARISES
														(INCLUDING ATTORNEYS’ FEES AND ALL RELATED COSTS AND EXPENSES OF
														LITIGATION AND ARBITRATION, IF ANY, WHETHER OR NOT LITIGATION OR
														ARBITRATION IS INSTITUTED), WHETHER IN AN ACTION OF CONTRACT,
														NEGLIGENCE, OR OTHER TORTIOUS ACTION, OR ARISING OUT OF OR IN CONNECTION
														WITH THIS AGREEMENT, INCLUDING WITHOUT LIMITATION ANY CLAIM FOR PERSONAL
														INJURY OR PROPERTY DAMAGE, ARISING FROM THIS AGREEMENT AND ANY VIOLATION
														BY YOU OF ANY FEDERAL, STATE, OR LOCAL LAWS, STATUTES, RULES, OR
														REGULATIONS, EVEN IF COMPANY HAS BEEN PREVIOUSLY ADVISED OF THE
														POSSIBILITY OF SUCH DAMAGE. EXCEPT AS PROHIBITED BY LAW, IF THERE IS
														LIABILITY FOUND ON THE PART OF COMPANY, IT WILL BE LIMITED TO THE AMOUNT
														PAID FOR THE PRODUCTS AND/OR SERVICES, AND UNDER NO CIRCUMSTANCES WILL
														THERE BE CONSEQUENTIAL OR PUNITIVE DAMAGES. SOME STATES DO NOT ALLOW THE
														EXCLUSION OR LIMITATION OF PUNITIVE, INCIDENTAL OR CONSEQUENTIAL
														DAMAGES, SO THE PRIOR LIMITATION OR EXCLUSION MAY NOT APPLY TO YOU.
													</p>
												</div>
												<div className='flex flex-row mb-4'>
													<div className='w-5 text-sm font-semibold'>12.0 </div>

													<p className='text-sm font-semibold ml-4'>Termination</p>
												</div>
												<div className='ml-6'>
													<p className='text-xs ml-4'>
														We may terminate or suspend your account and bar access to Service
														immediately, without prior notice or liability, under our sole
														discretion, for any reason whatsoever and without limitation, including
														but not limited to a breach of Terms. If you wish to terminate your
														account, you may simply discontinue using Service. All provisions of
														Terms which by their nature should survive termination shall survive
														termination, including, without limitation, ownership provisions,
														warranty disclaimers, indemnity and limitations of liability.
													</p>
												</div>
												<div className='flex flex-row mb-4'>
													<div className='w-5 text-sm font-semibold'>13.0 </div>

													<p className='text-sm font-semibold ml-4'>Governing Law</p>
												</div>
												<div className='ml-6'>
													<p className='text-xs ml-4'>
														These Terms shall be governed and construed in accordance with the laws
														of Nigeria, which governing law applies to agreement without regard to
														its conflict of law provisions. Our failure to enforce any right or
														provision of these Terms will not be considered a waiver of those
														rights. If any provision of these Terms is held to be invalid or
														unenforceable by a court, the remaining provisions of these Terms will
														remain in effect. These Terms constitute the entire agreement between us
														regarding our Service and supersede and replace any prior agreements we
														might have had between us regarding Service.
													</p>
												</div>
												<div className='flex flex-row mb-4'>
													<div className='w-5 text-sm font-semibold'>14.0 </div>

													<p className='text-sm font-semibold ml-4'>Amendments To Terms</p>
												</div>
												<div className='ml-6'>
													<p className='text-xs ml-4'>
														We may amend Terms at any time by posting the amended terms on this
														site. It is your responsibility to review these Terms periodically. Your
														continued use of the Platform following the posting of revised Terms
														means that you accept and agree to the changes. You are expected to
														check this page frequently so you are aware of any changes, as they are
														binding on you. By continuing to access or use our Service after any
														revisions become effective, you agree to be bound by the revised terms.
														If you do not agree to the new terms, you are no longer authorized to
														use Service.
													</p>
												</div>
												<div className='flex flex-row mb-4'>
													<div className='w-5 text-sm font-semibold'>15.0 </div>

													<p className='text-sm font-semibold ml-4'>Waiver And Severability</p>
												</div>
												<div className='ml-6'>
													<p className='text-xs ml-4'>
														No waiver by Company of any term or condition set forth in Terms shall
														be deemed a further or continuing waiver of such term or condition or a
														waiver of any other term or condition, and any failure of Company to
														assert a right or provision under Terms shall not constitute a waiver of
														such right or provision. If any provision of Terms is held by a court or
														other tribunal of competent jurisdiction to be invalid, illegal or
														unenforceable for any reason, such provision shall be eliminated or
														limited to the minimum extent such that the remaining provisions of
														Terms will continue in full force and effect.
													</p>
												</div>
												<div className='flex flex-row mb-4'>
													<div className='w-5 text-sm font-semibold'>16.0 </div>

													<p className='text-sm font-semibold ml-4'>Governing Law</p>
												</div>
												<div className='ml-6'>
													<p className='text-xs ml-4'>
														You agree that any dispute in connection with the Website, this
														Agreement or the Privacy Policy will be governed by the laws of Nigeria.
														You also consent to the resolution of any dispute arising out of or in
														connection with the Website, this Agreement or the Privacy Policy
														including any question regarding its existence, validity or termination
														by arbitration in Lagos in accordance with the Arbitration and
														Conciliation Act, Cap A18, Laws of the Federation of Nigeria 2004.
													</p>
												</div>
												<div className='flex flex-row mb-4'>
													<div className='w-5 text-sm font-semibold'>17.0 </div>

													<p className='text-sm font-semibold ml-4'>Acknowledgement</p>
												</div>
												<div className='ml-6'>
													<p className='text-xs ml-4'>
														BY USING SERVICE OR OTHER SERVICES PROVIDED BY US, YOU ACKNOWLEDGE THAT
														YOU HAVE READ THESE TERMS OF SERVICE AND AGREE TO BE BOUND BY THEM.
													</p>
												</div>
												<div className='flex flex-row mb-4'>
													<div className='w-5 text-sm font-semibold'>18.0 </div>

													<p className='text-sm font-semibold ml-4'>Contact Us</p>
												</div>
												<div className='ml-6'>
													<p className='text-xs ml-4'>
														Please send your feedback, comments, and requests for technical support
														by email:{' '}
														<a href='mailto:gokil@tolaram.com' className='font-bold no-underline'>
															gokil@tolaram.com
														</a>
														.
													</p>
												</div>
											</>
										</div>
									</>

									<button
										className='bg-red-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
										type='button'
										onClick={() => {
											setCheckTwo(false);
											setShowModal(false);
										}}
									>
										Cancel
									</button>
									<button
										className='bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
										// type="submit"
										onClick={() => {
											setCheckTwo(true);
											setCheckOne(true);
											setShowModal(false);
										}}
									>
										I agree
									</button>
								</div>
								{/*footer*/}
							</div>
						</div>
					</div>
					<div className='opacity-25 fixed inset-0 z-40 bg-black'></div>
				</>
			) : null}
		</>
	);
}

export default TermsAndCondition;
