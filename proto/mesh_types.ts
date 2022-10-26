import type * as grpc from '@grpc/grpc-js';
import type { ServiceDefinition, EnumTypeDefinition, MessageTypeDefinition } from '@grpc/proto-loader';


type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  spacemesh: {
    v1: {
      AccountId: MessageTypeDefinition
      AccountMeshData: MessageTypeDefinition
      AccountMeshDataFilter: MessageTypeDefinition
      AccountMeshDataFlag: EnumTypeDefinition
      AccountMeshDataQueryRequest: MessageTypeDefinition
      AccountMeshDataQueryResponse: MessageTypeDefinition
      AccountMeshDataStreamRequest: MessageTypeDefinition
      AccountMeshDataStreamResponse: MessageTypeDefinition
      Activation: MessageTypeDefinition
      ActivationId: MessageTypeDefinition
      Amount: MessageTypeDefinition
      AppEvent: MessageTypeDefinition
      Block: MessageTypeDefinition
      CurrentEpochRequest: MessageTypeDefinition
      CurrentEpochResponse: MessageTypeDefinition
      CurrentLayerRequest: MessageTypeDefinition
      CurrentLayerResponse: MessageTypeDefinition
      EpochNumLayersRequest: MessageTypeDefinition
      EpochNumLayersResponse: MessageTypeDefinition
      GenesisTimeRequest: MessageTypeDefinition
      GenesisTimeResponse: MessageTypeDefinition
      Layer: MessageTypeDefinition
      LayerDurationRequest: MessageTypeDefinition
      LayerDurationResponse: MessageTypeDefinition
      LayerLimits: MessageTypeDefinition
      LayerNumber: MessageTypeDefinition
      LayerStreamRequest: MessageTypeDefinition
      LayerStreamResponse: MessageTypeDefinition
      LayersQueryRequest: MessageTypeDefinition
      LayersQueryResponse: MessageTypeDefinition
      MaxTransactionsPerSecondRequest: MessageTypeDefinition
      MaxTransactionsPerSecondResponse: MessageTypeDefinition
      MeshTransaction: MessageTypeDefinition
      NetIDRequest: MessageTypeDefinition
      NetIDResponse: MessageTypeDefinition
      Nonce: MessageTypeDefinition
      Reward: MessageTypeDefinition
      SimpleInt: MessageTypeDefinition
      SimpleString: MessageTypeDefinition
      SmesherId: MessageTypeDefinition
      Transaction: MessageTypeDefinition
      TransactionId: MessageTypeDefinition
    }
  }
}

