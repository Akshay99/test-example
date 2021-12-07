import { MemberEntity } from '../../model';
import { members } from './mockData';

const baseURL = 'https://61af78d53e2aba0017c4938d.mockapi.io';
let mockMembers = members;

const fetchMembers = (): Promise<MemberEntity[]> => {
  return Promise.resolve(mockMembers);
};

const fetchMembersAsync = (): Promise<MemberEntity[]> => {
  const membersURL = `${baseURL}/testdata`;

  return fetch(membersURL, {method: 'GET'})
    .then((response) => (response.json()))
    .then(mapToMembers);
};

const fetchClientAsync = (): Promise<MemberEntity[]> => {
  const membersURL = `${baseURL}/clientData`;

  return fetch(membersURL, {method: 'GET'})
    .then((response) => (response.json()))
    .then(mapToMembers);
};

const mapToMembers = (githubMembers: any[]): any[] => {
  return githubMembers;
};

const mapToMember = (githubMember): MemberEntity => {
  return {
    id: githubMember.id,
    login: githubMember.login,
    avatar_url: githubMember.avatar_url,
  };
};

const saveMember = (member: MemberEntity): Promise<boolean> => {
  const index = mockMembers.findIndex(m => m.id === member.id);

  index >= 0 ?
    updateMember(member, index) :
    insertMember(member);

  return Promise.resolve(true);
};

const updateMember = (member: MemberEntity, index: number) => {
  mockMembers = [
    ...mockMembers.slice(0, index),
    member,
    ...mockMembers.slice(index + 1),
  ];
};

const insertMember = (member: MemberEntity) => {
  member.id = mockMembers.length;

  mockMembers = [
    ...mockMembers,
    member,
  ];
};

export const memberAPI = {
  fetchMembers,
  fetchMembersAsync,
  fetchClientAsync,
  saveMember,
};
